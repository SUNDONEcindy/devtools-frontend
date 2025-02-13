// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import type * as Platform from '../../../core/platform/platform.js';
import * as Bindings from '../../../models/bindings/bindings.js';

export function linkText(url: Platform.DevToolsPath.UrlString, lineNumber?: number): string {
  if (url) {
    const displayName = Bindings.ResourceUtils.displayNameForURL(url);
    let text = `${displayName}`;
    if (typeof lineNumber !== 'undefined') {
      text += `:${lineNumber + 1}`;
    }
    return text;
  }

  throw new Error('New linkifier component error: don\'t know how to generate link text for given arguments');
}
