// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

/**
 * @fileoverview Detect and prevent usage of inline `<style>`s within lit-html
 * templates.
 *
 * We require that all CSS lives in dedicated `.css` files and is used via
 * `adoptedStyleSheets`.
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const {isLitHtmlTemplateCall} = require('./utils.js');

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Check for <style> and </style> in Lit templates instead of using adoptedStyleSheets.',
      category: 'Possible Errors',
    },
    schema: []  // no options
  },
  create: function(context) {
    return {
      TaggedTemplateExpression(node) {
        const isLitHtmlCall = isLitHtmlTemplateCall(node);
        if (!isLitHtmlCall) {
          return;
        }

        // node.quasi.quasis are all the static parts of the template literal.
        for (const {value: {raw}} of node.quasi.quasis) {
          if (raw.includes('<style') || raw.includes('</style>')) {
            context.report({
              node,
              message:
                  'Adding styles to a component should be done using this.shadow.adoptedStyleSheets = [importedStyles]. Import the styles from the CSS file.',
            });
          }
        }
      },
    };
  }
};
