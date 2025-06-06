// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {getBrowserAndPages, getTestServerPort} from '../../shared/helper.js';

export const loadComponentDocExample = async (urlComponent: string) => {
  const {frontend} = getBrowserAndPages();
  const url = new URL(`http://localhost:${getTestServerPort()}/front_end/ui/components/docs/${urlComponent}`);
  await frontend.goto(url.toString(), {
    waitUntil: 'networkidle0',
  });
  // Hide the outer UI to prevent interaction tests from accidentally clicking on it.
  await frontend.evaluate(() => window.dispatchEvent(new Event('hidecomponentdocsui')));
};
