// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Use V8's code cache to speed up instantiation time.
require('v8-compile-cache');

const {ESLint} = require('eslint');
const stylelint = require('stylelint');
const {extname, join} = require('path');
const globby = require('globby');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const childProcess = require('child_process');
const {promisify} = require('util');
const {readFileSync} = require('fs');
const spawnAsync = promisify(childProcess.spawnSync);

const {
  devtoolsRootPath,
  litAnalyzerExecutablePath,
  nodePath,
  tsconfigJsonPath,
} = require('../devtools_paths.js');

const flags = yargs(hideBin(process.argv))
                  .option('fix', {
                    type: 'boolean',
                    default: true,
                    describe: 'Automatically fix, where possible, problems reported by rules.',
                  })
                  .usage(
                      '$0 [<files...>]', 'Run the linter on the provided files',
                      yargs => {
                        yargs.positional('files', {
                          describe: 'File(s), glob(s), or directories',
                          type: 'array',
                          default: ['front_end', 'inspector_overlay', 'scripts', 'test'],
                        });
                      })
                  .parse();

if (!flags.fix) {
  console.log('[lint]: fix is disabled; no errors will be autofixed.');
}

async function runESLint(files) {
  const cli = new ESLint({
    ignorePath: join(__dirname, '..', '..', '.eslintignore'),
    fix: flags.fix,
  });

  // We filter out certain files in the `.eslintignore`. However, ESLint produces warnings
  // when you include a particular file that is ignored. This means that if you edit a file
  // that is directly ignored in the `.eslintignore`, ESLint would report a failure.
  // This was originally reported in https://github.com/eslint/eslint/issues/9977
  // The suggested workaround is to use the CLIEngine to pre-emptively filter out these
  // problematic paths.
  files = await Promise.all(
      files.map(async file => ((await cli.isPathIgnored(file)) ? null : file)),
  );
  files = files.filter(file => file !== null);

  const results = await cli.lintFiles(files);

  if (flags.fix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await cli.loadFormatter('stylish');
  const output = formatter.format(results);
  if (output) {
    console.log(output);
  }

  return !results.find(report => report.errorCount + report.warningCount > 0);
}

async function runStylelint(files) {
  const {output, errored} = await stylelint.lint({
    configFile: join(__dirname, '..', '..', '.stylelintrc.json'),
    ignorePath: join(__dirname, '..', '..', '.stylelintignore'),
    fix: flags.fix,
    files,
    formatter: 'string',
  });

  if (output) {
    console.log(output);
  }

  return !errored;
}

/**
 * Runs the `lit-analyzer` on the `files`.
 *
 * The configuration for the `lit-analyzer` is parsed from the options for
 * the "ts-lit-plugin" from the toplevel `tsconfig.json` file.
 *
 * @param {string[]} files the input files to analyze.
 */
async function runLitAnalyzer(files) {
  const readLitAnalyzerConfigFromCompilerOptions = () => {
    const {compilerOptions} = JSON.parse(readFileSync(tsconfigJsonPath(), 'utf-8'));
    const {plugins} = compilerOptions;
    const tsLitPluginOptions = plugins.find(plugin => plugin.name === 'ts-lit-plugin');
    if (tsLitPluginOptions === null) {
      throw new Error(`Failed to find ts-lit-plugin options in ${tsconfigJsonPath()}`);
    }
    return tsLitPluginOptions;
  };

  const {rules} = readLitAnalyzerConfigFromCompilerOptions();
  const getLitAnalyzerResult = async subsetFiles => {
    const args = [
      litAnalyzerExecutablePath(),
      ...Object.entries(rules).flatMap(([k, v]) => [`--rules.${k}`, v]),
      ...subsetFiles,
    ];
    const result = await spawnAsync(nodePath(), args, {
      encoding: 'utf-8',
      cwd: devtoolsRootPath(),
      stdio: 'inherit',
    });
    return result.status === 0;
  };

  const getSplitFiles = filesToSplit => {
    if (process.platform !== 'win32') {
      return [filesToSplit];
    }

    const splitFiles = [[]];
    let index = 0;
    for (const file of filesToSplit) {
      // Windows max input is 8191 so we should be conservative
      if (splitFiles[index].join(' ').length + file.length < 6144) {
        splitFiles[index].push(file);
      } else {
        index++;
        splitFiles[index] = [file];
      }
    }
    return splitFiles;
  };

  const result = await Promise.all(
      getSplitFiles(files).map(filesBatch => {
        return getLitAnalyzerResult(filesBatch);
      }),
  );

  return result.every(r => r);
}

async function run() {
  const scripts = [];
  const styles = [];
  for (const path of globby.sync(flags.files, {
         expandDirectories: {extensions: ['css', 'js', 'ts']},
       })) {
    if (extname(path) === '.css') {
      styles.push(path);
    } else {
      scripts.push(path);
    }
  }

  let succeed = true;
  if (scripts.length !== 0) {
    succeed &&= await runESLint(scripts);
    succeed &&= await runLitAnalyzer(scripts);
  }
  if (styles.length !== 0) {
    succeed &&= await runStylelint(styles);
  }
  return succeed;
}

run()
    .then(succeed => {
      process.exit(succeed ? 0 : 1);
    })
    .catch(err => {
      console.log(`[lint]: ${err.message}`, err.stack);
      process.exit(1);
    });
