/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { storiesOf } from "@storybook/react";
import { withLinks } from "@storybook/addon-links";
import { mockExperimentQuery } from "../../lib/mocks";
import TableMetricSecondary from ".";
import { mockAnalysis } from "../../lib/visualization/mocks";

storiesOf("visualization/TableMetricSecondary", module)
  .addDecorator(withLinks)
  .add("with positive secondary metric", () => {
    const { experiment } = mockExperimentQuery("demo-slug", {
      secondaryProbeSets: [
        {
          __typename: "NimbusProbeSetType",
          id: "1",
          slug: "picture_in_picture",
          name: "Picture-in-Picture",
        },
      ],
    });

    return (
      <TableMetricSecondary
        results={mockAnalysis().overall}
        probeSetSlug={experiment.secondaryProbeSets![0]!.slug}
        probeSetName={experiment.secondaryProbeSets![0]!.name}
        isDefault={false}
      />
    );
  })
  .add("with negative secondary metric", () => {
    const { experiment } = mockExperimentQuery("demo-slug");
    return (
      <TableMetricSecondary
        results={mockAnalysis().overall}
        probeSetSlug={experiment.secondaryProbeSets![0]!.slug}
        probeSetName={experiment.secondaryProbeSets![0]!.name}
        isDefault={false}
      />
    );
  })
  .add("with neutral secondary metric", () => {
    const { experiment } = mockExperimentQuery("demo-slug", {
      secondaryProbeSets: [
        {
          __typename: "NimbusProbeSetType",
          id: "1",
          slug: "feature_c",
          name: "Feature C",
        },
      ],
    });

    return (
      <TableMetricSecondary
        results={mockAnalysis().overall}
        probeSetSlug={experiment.secondaryProbeSets![0]!.slug}
        probeSetName={experiment.secondaryProbeSets![0]!.name}
        isDefault={false}
      />
    );
  });
