// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as AiCodeCompletion from '../../models/ai_code_completion/ai_code_completion.js';
import type * as TextEditor from '../../ui/components/text_editor/text_editor.js';

export class StylesAiCodeCompletionProvider {
  #aidaClient: Host.AidaClient.AidaClient = new Host.AidaClient.AidaClient();
  #aiCodeCompletionSetting = Common.Settings.Settings.instance().createSetting('ai-code-completion-enabled', false);
  #aiCodeCompletion?: AiCodeCompletion.AiCodeCompletion.AiCodeCompletion;
  #aiCodeCompletionConfig?: TextEditor.AiCodeCompletionProvider.AiCodeCompletionConfig;

  #boundOnUpdateAiCodeCompletionState = this.#updateAiCodeCompletionState.bind(this);

  private constructor(aiCodeCompletionConfig: TextEditor.AiCodeCompletionProvider.AiCodeCompletionConfig) {
    const devtoolsLocale = i18n.DevToolsLocale.DevToolsLocale.instance();
    if (!AiCodeCompletion.AiCodeCompletion.AiCodeCompletion.isAiCodeCompletionStylesEnabled(devtoolsLocale.locale)) {
      throw new Error('AI code completion feature in Styles is not enabled.');
    }
    this.#aiCodeCompletionConfig = aiCodeCompletionConfig;
    Host.AidaClient.HostConfigTracker.instance().addEventListener(
        Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED, this.#boundOnUpdateAiCodeCompletionState);
    this.#aiCodeCompletionSetting.addChangeListener(this.#boundOnUpdateAiCodeCompletionState);
    void this.#updateAiCodeCompletionState();
  }

  static createInstance(aiCodeCompletionConfig: TextEditor.AiCodeCompletionProvider.AiCodeCompletionConfig):
      StylesAiCodeCompletionProvider {
    return new StylesAiCodeCompletionProvider(aiCodeCompletionConfig);
  }

  #setupAiCodeCompletion(): void {
    if (!this.#aiCodeCompletionConfig) {
      return;
    }
    if (this.#aiCodeCompletion) {
      // early return as this means that code completion was previously setup
      return;
    }
    this.#aiCodeCompletion = new AiCodeCompletion.AiCodeCompletion.AiCodeCompletion(
        {aidaClient: this.#aidaClient}, this.#aiCodeCompletionConfig.panel, undefined,
        this.#aiCodeCompletionConfig.completionContext.stopSequences);
    this.#aiCodeCompletionConfig.onFeatureEnabled();
  }

  #cleanupAiCodeCompletion(): void {
    if (!this.#aiCodeCompletion) {
      // early return as this means there is no code completion to clean up
      return;
    }
    this.#aiCodeCompletion = undefined;
    this.#aiCodeCompletionConfig?.onFeatureDisabled();
  }

  async #updateAiCodeCompletionState(): Promise<void> {
    const aidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
    const isAvailable = aidaAvailability === Host.AidaClient.AidaAccessPreconditions.AVAILABLE;
    const isEnabled = this.#aiCodeCompletionSetting.get();
    if (isAvailable && isEnabled) {
      this.#setupAiCodeCompletion();
    } else {
      this.#cleanupAiCodeCompletion();
    }
  }
}
