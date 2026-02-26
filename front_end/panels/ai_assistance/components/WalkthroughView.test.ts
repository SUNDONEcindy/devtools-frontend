// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {renderElementIntoDOM} from '../../../testing/DOMHelpers.js';
import {describeWithEnvironment} from '../../../testing/EnvironmentHelpers.js';
import * as AiAssistance from '../ai_assistance.js';

describeWithEnvironment('WalkthroughView', () => {
  it('renders empty state when no steps provided', async () => {
    const view = new AiAssistance.WalkthroughView.WalkthroughView(document.createElement('div'));
    view.data = {
      steps: [],
      isLoading: false,
      markdownRenderer: new AiAssistance.MarkdownRendererWithCodeBlock(),
    };
    renderElementIntoDOM(view.contentElement);
    view.performUpdate();

    const emptyState = view.contentElement.querySelector('.empty-state');
    assert.isNotNull(emptyState);
    assert.include(emptyState?.textContent, 'No walkthrough steps available yet.');
  });

  it('renders steps correctly', async () => {
    const view = new AiAssistance.WalkthroughView.WalkthroughView(document.createElement('div'));
    view.data = {
      steps: [
        {
          isLoading: false,
          title: 'Step 1',
          thought: 'Thinking...',
          code: 'console.log("test")',
        },
      ],
      isLoading: false,
      markdownRenderer: new AiAssistance.MarkdownRendererWithCodeBlock(),
    };
    renderElementIntoDOM(view.contentElement);
    view.performUpdate();

    const stepTitle = view.contentElement.querySelector('.title');
    assert.isNotNull(stepTitle);
    assert.strictEqual(stepTitle?.textContent, 'Step 1');

    const stepCode = view.contentElement.querySelector('devtools-code-block');
    assert.isNotNull(stepCode);
    assert.strictEqual(stepCode?.code, 'console.log("test")');
  });

  it('renders inline view with correct class', async () => {
    const view = new AiAssistance.WalkthroughView.WalkthroughView(document.createElement('div'));
    view.data = {
      steps: [],
      isLoading: false,
      markdownRenderer: new AiAssistance.MarkdownRendererWithCodeBlock(),
      isInline: true,
      isOpen: true,
    };
    renderElementIntoDOM(view.contentElement);
    view.performUpdate();

    const inlineView = view.contentElement.querySelector('.walkthrough-inline');
    assert.isNotNull(inlineView);
    assert.isTrue(inlineView?.hasAttribute('open'));
  });

  it('calls onClose when close button is clicked in sidebar mode', async () => {
    const onClose = sinon.spy();
    const view = new AiAssistance.WalkthroughView.WalkthroughView(document.createElement('div'));
    view.data = {
      steps: [],
      isLoading: false,
      markdownRenderer: new AiAssistance.MarkdownRendererWithCodeBlock(),
      onClose,
    };
    renderElementIntoDOM(view.contentElement);
    view.performUpdate();

    const closeButton = view.contentElement.querySelector('devtools-button');
    assert.isNotNull(closeButton);
    closeButton?.click();
    sinon.assert.calledOnce(onClose);
  });

  it('calls onToggle when inline details are toggled', async () => {
    const onToggle = sinon.spy();
    const view = new AiAssistance.WalkthroughView.WalkthroughView(document.createElement('div'));
    view.data = {
      steps: [],
      isLoading: false,
      markdownRenderer: new AiAssistance.MarkdownRendererWithCodeBlock(),
      isInline: true,
      isOpen: true,
      onToggle,
    };
    renderElementIntoDOM(view.contentElement);
    view.performUpdate();

    const details = view.contentElement.querySelector('details');
    assert.isNotNull(details);
    details?.dispatchEvent(new Event('toggle'));
    sinon.assert.calledOnce(onToggle);
  });
});
