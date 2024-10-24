// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import type * as Workspace from '../../models/workspace/workspace.js';

import {
  AiAgent,
  type AidaRequestOptions,
  type ContextDetail,
  type ContextResponse,
  type ParsedResponse,
  ResponseType,
} from './AiAgent.js';

const preamble =
    `You are a highly skilled software engineer with expertise in various programming languages and frameworks.
You are provided with the content of a file from the Chrome DevTools Sources panel.

**Important Note:** The provided code may represent an incomplete fragment of a larger file.

Analyze the code and provide the following information:
* Describe the primary functionality of the code. What does it do? Be specific and concise.
* If possible, identify the framework or library the code is associated with (e.g., React, Angular, jQuery). List any key technologies, APIs, or patterns used in the code (e.g., Fetch API, WebSockets, object-oriented programming).
* (Only provide if available and accessible externally) External Resources: Suggest relevant documentation that could help a developer understand the code better. Prioritize official documentation if available. Do not provide any internal resources.

# Considerations
* Keep your analysis concise and focused, highlighting only the most critical aspects for a software engineer.
* **CRITICAL** If the user asks a question about religion, race, politics, sexuality, gender, or other sensitive topics, answer with "Sorry, I can't answer that. I'm best at questions about files."

## Example session

**User:** (Selects a file containing the following JavaScript code)

function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}
Explain this file.


This code defines a function called calculateTotal that calculates the total cost by multiplying the price and quantity arguments.
This code is written in JavaScript and doesn't seem to be associated with a specific framework. It's likely a utility function.
Relevant Technologies: JavaScript, functions, arithmetic operations.
External Resources:
MDN Web Docs: JavaScript Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
`;

/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
  /**
   *@description Title for thinking step of DrJones File agent.
   */
  analyzingFile: 'Analyzing file',
};

const lockedString = i18n.i18n.lockedString;

const MAX_FILE_SIZE = 50000;

/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export class DrJonesFileAgent extends AiAgent<Workspace.UISourceCode.UISourceCode> {
  readonly preamble = preamble;
  readonly clientFeature = Host.AidaClient.ClientFeature.CHROME_DRJONES_FILE_AGENT;
  get userTier(): string|undefined {
    const config = Common.Settings.Settings.instance().getHostConfig();
    return config.devToolsAiAssistanceFileAgentDogfood?.userTier;
  }
  get options(): AidaRequestOptions {
    const config = Common.Settings.Settings.instance().getHostConfig();
    const temperature = config.devToolsAiAssistanceFileAgentDogfood?.temperature;
    const modelId = config.devToolsAiAssistanceFileAgentDogfood?.modelId;

    return {
      temperature,
      modelId,
    };
  }

  async *
      handleContextDetails(selectedFile: Workspace.UISourceCode.UISourceCode|null):
          AsyncGenerator<ContextResponse, void, void> {
    if (!selectedFile) {
      return;
    }

    yield {
      type: ResponseType.CONTEXT,
      title: lockedString(UIStringsNotTranslate.analyzingFile),
      details: createContextDetailsForDrJonesFileAgent(selectedFile),
    };
  }

  override async enhanceQuery(query: string, selectedFile: Workspace.UISourceCode.UISourceCode|null): Promise<string> {
    const fileEnchantmentQuery =
        selectedFile ? `# Selected file\n${formatFile(selectedFile)}\n\n# User request\n\n` : '';
    return `${fileEnchantmentQuery}${query}`;
  }

  override parseResponse(response: string): ParsedResponse {
    return {
      answer: response,
    };
  }
}

function createContextDetailsForDrJonesFileAgent(selectedFile: Workspace.UISourceCode.UISourceCode):
    [ContextDetail, ...ContextDetail[]] {
  return [
    {
      title: 'Selected file',
      text: formatFile(selectedFile),
    },
  ];
}

function formatFile(selectedFile: Workspace.UISourceCode.UISourceCode): string {
  return `File Name: ${selectedFile.displayName()}
URL: ${selectedFile.url()}
File Content:
${selectedFile.content().slice(0, MAX_FILE_SIZE)}`;
}

function setDebugFreestylerEnabled(enabled: boolean): void {
  if (enabled) {
    localStorage.setItem('debugFreestylerEnabled', 'true');
  } else {
    localStorage.removeItem('debugFreestylerEnabled');
  }
}

// @ts-ignore
globalThis.setDebugFreestylerEnabled = setDebugFreestylerEnabled;
