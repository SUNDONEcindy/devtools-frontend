/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { mkdtemp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { computeSystemExecutablePath, Browser as SupportedBrowsers, ChromeReleaseChannel as BrowsersChromeReleaseChannel, } from '@puppeteer/browsers';
import { debugError } from '../common/util.js';
import { assert } from '../util/assert.js';
import { BrowserLauncher } from './BrowserLauncher.js';
import { rm } from './util/fs.js';
/**
 * @internal
 */
export class ChromeLauncher extends BrowserLauncher {
    constructor(puppeteer) {
        super(puppeteer, 'chrome');
    }
    launch(options = {}) {
        if (this.puppeteer.configuration.logLevel === 'warn' &&
            process.platform === 'darwin' &&
            process.arch === 'x64') {
            const cpus = os.cpus();
            if (cpus[0]?.model.includes('Apple')) {
                console.warn([
                    '\x1B[1m\x1B[43m\x1B[30m',
                    'Degraded performance warning:\x1B[0m\x1B[33m',
                    'Launching Chrome on Mac Silicon (arm64) from an x64 Node installation results in',
                    'Rosetta translating the Chrome binary, even if Chrome is already arm64. This would',
                    'result in huge performance issues. To resolve this, you must run Puppeteer with',
                    'a version of Node built for arm64.',
                ].join('\n  '));
            }
        }
        return super.launch(options);
    }
    /**
     * @internal
     */
    async computeLaunchArguments(options = {}) {
        const { ignoreDefaultArgs = false, args = [], pipe = false, debuggingPort, channel, executablePath, } = options;
        const chromeArguments = [];
        if (!ignoreDefaultArgs) {
            chromeArguments.push(...this.defaultArgs(options));
        }
        else if (Array.isArray(ignoreDefaultArgs)) {
            chromeArguments.push(...this.defaultArgs(options).filter(arg => {
                return !ignoreDefaultArgs.includes(arg);
            }));
        }
        else {
            chromeArguments.push(...args);
        }
        if (!chromeArguments.some(argument => {
            return argument.startsWith('--remote-debugging-');
        })) {
            if (pipe) {
                assert(!debuggingPort, 'Browser should be launched with either pipe or debugging port - not both.');
                chromeArguments.push('--remote-debugging-pipe');
            }
            else {
                chromeArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
            }
        }
        let isTempUserDataDir = false;
        // Check for the user data dir argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        let userDataDirIndex = chromeArguments.findIndex(arg => {
            return arg.startsWith('--user-data-dir');
        });
        if (userDataDirIndex < 0) {
            isTempUserDataDir = true;
            chromeArguments.push(`--user-data-dir=${await mkdtemp(this.getProfilePath())}`);
            userDataDirIndex = chromeArguments.length - 1;
        }
        const userDataDir = chromeArguments[userDataDirIndex].split('=', 2)[1];
        assert(typeof userDataDir === 'string', '`--user-data-dir` is malformed');
        let chromeExecutable = executablePath;
        if (!chromeExecutable) {
            assert(channel || !this.puppeteer._isPuppeteerCore, `An \`executablePath\` or \`channel\` must be specified for \`puppeteer-core\``);
            chromeExecutable = channel
                ? this.executablePath(channel)
                : this.resolveExecutablePath(options.headless ?? true);
        }
        return {
            executablePath: chromeExecutable,
            args: chromeArguments,
            isTempUserDataDir,
            userDataDir,
        };
    }
    /**
     * @internal
     */
    async cleanUserDataDir(path, opts) {
        if (opts.isTemp) {
            try {
                await rm(path);
            }
            catch (error) {
                debugError(error);
                throw error;
            }
        }
    }
    defaultArgs(options = {}) {
        // See https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md
        const userDisabledFeatures = getFeatures('--disable-features', options.args);
        if (options.args && userDisabledFeatures.length > 0) {
            removeMatchingFlags(options.args, '--disable-features');
        }
        const turnOnExperimentalFeaturesForTesting = process.env['PUPPETEER_TEST_EXPERIMENTAL_CHROME_FEATURES'] === 'true';
        // Merge default disabled features with user-provided ones, if any.
        const disabledFeatures = [
            'Translate',
            // AcceptCHFrame disabled because of crbug.com/1348106.
            'AcceptCHFrame',
            'MediaRouter',
            'OptimizationHints',
            ...(turnOnExperimentalFeaturesForTesting
                ? []
                : [
                    // https://crbug.com/1492053
                    'ProcessPerSiteUpToMainFrameThreshold',
                    // https://github.com/puppeteer/puppeteer/issues/10715
                    'IsolateSandboxedIframes',
                ]),
            ...userDisabledFeatures,
        ].filter(feature => {
            return feature !== '';
        });
        const userEnabledFeatures = getFeatures('--enable-features', options.args);
        if (options.args && userEnabledFeatures.length > 0) {
            removeMatchingFlags(options.args, '--enable-features');
        }
        // Merge default enabled features with user-provided ones, if any.
        const enabledFeatures = [
            'PdfOopif',
            // Add features to enable by default here.
            ...userEnabledFeatures,
        ].filter(feature => {
            return feature !== '';
        });
        const chromeArguments = [
            '--allow-pre-commit-input',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-extensions-with-background-pages',
            '--disable-crash-reporter', // No crash reporting in CfT.
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-hang-monitor',
            '--disable-infobars',
            '--disable-ipc-flooding-protection',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-search-engine-choice-screen',
            '--disable-sync',
            '--enable-automation',
            '--export-tagged-pdf',
            '--force-color-profile=srgb',
            '--generate-pdf-document-outline',
            '--metrics-recording-only',
            '--no-first-run',
            '--password-store=basic',
            '--use-mock-keychain',
            `--disable-features=${disabledFeatures.join(',')}`,
            `--enable-features=${enabledFeatures.join(',')}`,
        ].filter(arg => {
            return arg !== '';
        });
        const { devtools = false, headless = !devtools, args = [], userDataDir, enableExtensions = false, } = options;
        if (userDataDir) {
            chromeArguments.push(`--user-data-dir=${path.resolve(userDataDir)}`);
        }
        if (devtools) {
            chromeArguments.push('--auto-open-devtools-for-tabs');
        }
        if (headless) {
            chromeArguments.push(headless === 'shell' ? '--headless' : '--headless=new', '--hide-scrollbars', '--mute-audio');
        }
        chromeArguments.push(enableExtensions
            ? '--enable-unsafe-extension-debugging'
            : '--disable-extensions');
        if (args.every(arg => {
            return arg.startsWith('-');
        })) {
            chromeArguments.push('about:blank');
        }
        chromeArguments.push(...args);
        return chromeArguments;
    }
    executablePath(channel, validatePath = true) {
        if (channel) {
            return computeSystemExecutablePath({
                browser: SupportedBrowsers.CHROME,
                channel: convertPuppeteerChannelToBrowsersChannel(channel),
            });
        }
        else {
            return this.resolveExecutablePath(undefined, validatePath);
        }
    }
}
function convertPuppeteerChannelToBrowsersChannel(channel) {
    switch (channel) {
        case 'chrome':
            return BrowsersChromeReleaseChannel.STABLE;
        case 'chrome-dev':
            return BrowsersChromeReleaseChannel.DEV;
        case 'chrome-beta':
            return BrowsersChromeReleaseChannel.BETA;
        case 'chrome-canary':
            return BrowsersChromeReleaseChannel.CANARY;
    }
}
/**
 * Extracts all features from the given command-line flag
 * (e.g. `--enable-features`, `--enable-features=`).
 *
 * Example input:
 * ["--enable-features=NetworkService,NetworkServiceInProcess", "--enable-features=Foo"]
 *
 * Example output:
 * ["NetworkService", "NetworkServiceInProcess", "Foo"]
 *
 * @internal
 */
export function getFeatures(flag, options = []) {
    return options
        .filter(s => {
        return s.startsWith(flag.endsWith('=') ? flag : `${flag}=`);
    })
        .map(s => {
        return s.split(new RegExp(`${flag}=\\s*`))[1]?.trim();
    })
        .filter(s => {
        return s;
    });
}
/**
 * Removes all elements in-place from the given string array
 * that match the given command-line flag.
 *
 * @internal
 */
export function removeMatchingFlags(array, flag) {
    const regex = new RegExp(`^${flag}=.*`);
    let i = 0;
    while (i < array.length) {
        if (regex.test(array[i])) {
            array.splice(i, 1);
        }
        else {
            i++;
        }
    }
    return array;
}
//# sourceMappingURL=ChromeLauncher.js.map