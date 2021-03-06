/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { SIGNIFICANCE } from "./constants";

export const mockAnalysis = (modifications = {}) =>
  Object.assign(
    {
      other_metrics: {
        feature_d: "Feature D",
      },
      show_analysis: true,
      daily: [],
      weekly: [],
      overall: {
        control: {
          is_control: true,
          branch_data: {
            identity: {
              absolute: {
                point: 198,
              },
              difference: {},
              relative_uplift: {},
              percent: 45,
            },
            search_count: {
              absolute: {
                point: 14.967359019193298,
                lower: 10.534758870048162,
                upper: 20.754349791764547,
              },
              difference: {},
              relative_uplift: {},
            },
            retained: {
              absolute: {
                point: 0.92610837438423643,
                lower: 0.88644814975695319,
                upper: 0.95784492649935471,
              },
              difference: {},
              relative_uplift: {},
            },
            picture_in_picture_ever_used: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            picture_in_picture: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_b_ever_used: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_b: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_c_ever_used: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_c: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_d: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            probeset_d: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
          },
        },
        treatment: {
          is_control: true,
          branch_data: {
            identity: {
              absolute: {
                point: 200,
              },
              difference: {},
              relative_uplift: {},
              percent: 55,
            },
            search_count: {
              absolute: {
                point: 25.456361412643364,
                lower: 18.998951440573688,
                upper: 33.549291754637153,
              },
              difference: {
                point: 5.0758527676460012,
                upper: -5.63685604594333,
                lower: -15.289651027022447,
              },
              relative_uplift: {},
              significance: SIGNIFICANCE.NEGATIVE,
            },
            retained: {
              absolute: {
                point: 0.64215686274509809,
                lower: 0.57529460650836961,
                upper: 0.7063786618426765,
              },
              difference: {
                point: 0.032060163779913255,
                lower: -0.065023804214299957,
                upper: 0.12483606976999304,
              },
              relative_uplift: {},
              significance: SIGNIFICANCE.NEUTRAL,
            },
            picture_in_picture_ever_used: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.POSITIVE,
            },
            picture_in_picture: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.POSITIVE,
            },
            feature_b_ever_used: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.NEGATIVE,
            },
            feature_b: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.NEGATIVE,
            },
            feature_c_ever_used: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.NEUTRAL,
            },
            feature_c: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.NEUTRAL,
            },
            feature_d: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.POSITIVE,
            },
            probeset_d: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.POSITIVE,
            },
          },
        },
      },
    },
    modifications,
  );

/*
 * An incomplete analysis is missing one or both of `retained` and/or `search_count`
 */
export const mockIncompleteAnalysis = (modifications = {}) =>
  Object.assign(
    {
      show_analysis: true,
      daily: [],
      weekly: [],
      overall: {
        control: {
          is_control: true,
          branch_data: {
            identity: {
              absolute: {
                point: 198,
              },
              difference: {},
              relative_uplift: {},
              percent: 45,
            },
            search_count: {
              absolute: {
                point: 14.967359019193298,
                lower: 10.534758870048162,
                upper: 20.754349791764547,
              },
              difference: {},
              relative_uplift: {},
            },
            picture_in_picture_ever_used: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_b_ever_used: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            feature_c_ever_used: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
            probeset_d: {
              absolute: {
                point: 0.05,
                count: 10,
                lower: 0.024357271316207685,
                upper: 0.084114637001734827,
              },
              difference: {},
              relative_uplift: {},
            },
          },
        },
        treatment: {
          is_control: true,
          branch_data: {
            identity: {
              absolute: {
                point: 200,
              },
              difference: {},
              relative_uplift: {},
              percent: 55,
            },
            search_count: {
              absolute: {
                point: 25.456361412643364,
                lower: 18.998951440573688,
                upper: 33.549291754637153,
              },
              difference: {
                point: 5.0758527676460012,
                upper: -5.63685604594333,
                lower: -15.289651027022447,
              },
              relative_uplift: {},
              significance: SIGNIFICANCE.NEGATIVE,
            },
            picture_in_picture_ever_used: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.POSITIVE,
            },
            feature_b_ever_used: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.NEGATIVE,
            },
            feature_c_ever_used: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.NEUTRAL,
            },
            probeset_d: {
              absolute: {
                point: 0.049019607843137254,
                count: 10,
                lower: 0.023872203557007872,
                upper: 0.082490692094610241,
              },
              difference: {
                point: -0.00065694876288765341,
                upper: 0.043163817365120191,
                lower: 0.041750959639940292,
              },
              relative_uplift: {
                lower: -0.455210299676828,
                upper: 0.5104985718410426,
                point: -0.06233954570562385,
              },
              significance: SIGNIFICANCE.POSITIVE,
            },
          },
        },
      },
    },
    modifications,
  );
