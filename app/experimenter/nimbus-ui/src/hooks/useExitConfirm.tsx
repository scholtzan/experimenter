/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { useCallback } from "react";
import { EXIT_CONFIRMATION } from "../lib/constants";

export function useExitConfirm(
  when: boolean,
  callback: (ev: React.FormEvent) => void,
) {
  return useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      if (!when || (when && window.confirm(EXIT_CONFIRMATION))) {
        callback(ev);
      }
    },
    [callback, when],
  );
}
