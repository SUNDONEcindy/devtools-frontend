// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';

import {
  click,
  getBrowserAndPages,
  hover,
  waitFor,
  waitForAria,
  waitForElementWithTextContent,
  waitForFunction,
  waitForMany,
  waitForNone,
} from '../../shared/helper.js';
import {
  ELEMENTS_PANEL_SELECTOR,
  getStyleRule,
  goToResourceAndWaitForStyleSection,
  SECTION_SUBTITLE_SELECTOR,
  STYLE_PROPERTIES_SELECTOR,
} from '../helpers/elements-helpers.js';

async function getStyleRuleProperties(selector: string, count: number) {
  const rule = await getStyleRule(selector);
  const propertyElements = await waitForMany(STYLE_PROPERTIES_SELECTOR, count, rule);
  const properties = await Promise.all(propertyElements.map(e => e.evaluate(e => e.textContent)));
  properties.sort();
  const subtitle = await waitFor(SECTION_SUBTITLE_SELECTOR, rule).then(e => e.evaluate(e => e.textContent));

  return {properties, subtitle};
}

describe('The styles pane', () => {
  it('shows syntax mismatches as invalid properties', async () => {
    await goToResourceAndWaitForStyleSection('elements/at-property.html');
    await waitFor('.invalid-property-value:has(> [aria-label="CSS property name: --my-color"])');
  });

  it('shows a parser error message popover on syntax mismatches', async () => {
    await goToResourceAndWaitForStyleSection('elements/at-property.html');
    await hover('.invalid-property-value:has(> [aria-label="CSS property name: --my-color"]) .exclamation-mark');

    const popover = await waitFor(':popover-open devtools-css-variable-parser-error');
    const firstSection = await waitFor('.variable-value-popup-wrapper', popover);
    const popoverContents = await firstSection.evaluate(e => e.deepInnerText());

    assert.deepEqual(popoverContents, 'Invalid property value, expected type "<color>"\nView registered property');
  });

  it('shows registered properties', async () => {
    await goToResourceAndWaitForStyleSection('elements/at-property.html');
    assert.deepEqual(await getStyleRuleProperties('--my-color', 3), {
      properties: ['    inherits: false;', '    initial-value: red;', '    syntax: "<color>";'],
      subtitle: '<style>',
    });
    assert.deepEqual(await getStyleRuleProperties('--my-color2', 3), {
      properties: ['    inherits: false;', '    initial-value: #c0ffee;', '    syntax: "<color>";'],
      subtitle: '<style>',
    });
    assert.deepEqual(await getStyleRuleProperties('--my-cssom-color', 3), {
      properties: ['    inherits: false;', '    initial-value: orange;', '    syntax: "<color>";'],
      subtitle: 'CSS.registerProperty',
    });
  });

  it('shows a foldable @property section when there are 5 or less registered properties', async () => {
    await goToResourceAndWaitForStyleSection('elements/at-property.html');

    const stylesPane = await waitFor('div.styles-pane');
    {
      const section = await waitForElementWithTextContent('@property', stylesPane);
      assert.deepEqual(await section.evaluate(e => e.ariaExpanded), 'true');
      const rule = await getStyleRule('--my-color');
      assert.isTrue(await rule.evaluate(e => !e.classList.contains('hidden')));
    }

    {
      const section = await click('pierceShadowText/@property', {root: stylesPane});
      await waitForFunction(async () => 'false' === await section.evaluate(e => e.ariaExpanded));
      const rule = await getStyleRule('--my-color');
      await waitForFunction(() => rule.evaluate(e => e.classList.contains('hidden')));
    }
  });

  it('shows a collapsed @property section when there are more than 5 registered properties', async () => {
    await goToResourceAndWaitForStyleSection('elements/at-property.html');
    const {target, frontend} = getBrowserAndPages();

    // Add some properties to go above the threshold
    await target.evaluate(() => {
      for (let n = 0; n < 5; ++n) {
        CSS.registerProperty({name: `--custom-prop-${n}`, inherits: false, syntax: '<length>', initialValue: '0px'});
      }
    });

    await frontend.reload();

    const stylesPane = await waitFor('div.styles-pane');
    {
      const section = await waitForElementWithTextContent('@property', stylesPane);
      assert.deepEqual(await section.evaluate(e => e.ariaExpanded), 'false');
      // Pick the style rule added last to ensure the sections are fully drawn
      const rule = await getStyleRule('--custom-prop-4');
      assert.isTrue(await rule.evaluate(e => e.classList.contains('hidden')));
    }

    await waitForFunction(async () => {
      const section = await click('pierceShadowText/@property', {root: stylesPane});
      await waitForFunction(async () => 'true' === await section.evaluate(e => e.ariaExpanded));
      const rule = await getStyleRule('--custom-prop-4');
      return await rule.evaluate(e => !e.classList.contains('hidden'));
    });
  });

  it('shows registration information in a variable popover', async () => {
    async function hoverVariable(label: string) {
      const isValue = label.startsWith('var(');
      if (isValue) {
        const prop = await waitForAria(`CSS property value: ${label}`);
        await hover('.link-swatch-link', {root: prop});
      } else {
        await hover(`aria/CSS property name: ${label}`);
      }

      const popover = await waitFor(':popover-open devtools-css-variable-value-view');
      const popoverContents = await popover.evaluate(e => {
        return e.deepInnerText();
      });

      await hover(ELEMENTS_PANEL_SELECTOR);
      await waitForNone(':popover-open devtools-css-variable-value-view');

      return popoverContents;
    }
    await goToResourceAndWaitForStyleSection('elements/at-property.html');

    assert.strictEqual(
        await hoverVariable('var(--my-cssom-color)'),
        'orange\nsyntax: "<color>"\ninherits: false\ninitial-value: orange\nView registered property');

    assert.strictEqual(
        await hoverVariable('--my-color'),
        'red\nsyntax: "<color>"\ninherits: false\ninitial-value: red\nView registered property');
    assert.strictEqual(
        await hoverVariable('var(--my-color)'),
        'red\nsyntax: "<color>"\ninherits: false\ninitial-value: red\nView registered property');

    assert.strictEqual(
        await hoverVariable('--my-color2'),
        'gray\nsyntax: "<color>"\ninherits: false\ninitial-value: #c0ffee\nView registered property');
    assert.strictEqual(
        await hoverVariable('var(--my-color2)'),
        'gray\nsyntax: "<color>"\ninherits: false\ninitial-value: #c0ffee\nView registered property');

    assert.strictEqual(await hoverVariable('--my-other-color'), 'green');
    assert.strictEqual(await hoverVariable('var(--my-other-color)'), 'green');
  });
});
