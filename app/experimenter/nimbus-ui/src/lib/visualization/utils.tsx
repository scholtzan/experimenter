/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { DISPLAY_TYPE, METRIC, TABLE_LABEL } from "./constants";

export const getTableDisplayType = (
  metricKey: string,
  tableLabel: string,
  isControl: boolean,
): DISPLAY_TYPE => {
  let displayType;
  switch (metricKey) {
    case METRIC.USER_COUNT:
      displayType = DISPLAY_TYPE.POPULATION;
      break;
    case METRIC.SEARCH:
      if (tableLabel === TABLE_LABEL.RESULTS || isControl) {
        displayType = DISPLAY_TYPE.COUNT;
        break;
      }

    // fall through
    default:
      displayType = DISPLAY_TYPE.PERCENT;
  }

  return displayType;
};

export const humanDate = (date: string | number): string => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const stringDateSubtract = (dateA: string, dateB: string): number => {
  const DAY = 86400000; // Number of milliseconds in a day
  const dateAConverted = +new Date(dateA);
  const dateBConverted = +new Date(dateB);
  const dateDifference = Math.abs(dateAConverted - dateBConverted);

  return Math.round(dateDifference / DAY);
};
