/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedCache, mockExperimentQuery } from "../../lib/mocks";
import TableSummary from ".";
import { getExperiment_experimentBySlug } from "../../types/getExperiment";
import { NimbusExperimentChannel } from "../../types/globalTypes";

describe("TableAudience", () => {
  describe("renders 'Channel' row as expected", () => {
    it("with one channel", () => {
      const { experiment } = mockExperimentQuery("demo-slug", {
        channel: NimbusExperimentChannel.DESKTOP_BETA,
      });
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-channel")).toHaveTextContent(
        "Desktop Beta",
      );
    });
    it("when not set", () => {
      const { experiment } = mockExperimentQuery("demo-slug", {
        channel: null,
      });
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-channel")).toHaveTextContent(
        "Not set",
      );
    });
  });
  describe("renders 'Minimum version' row as expected", () => {
    it("when set", () => {
      const { experiment } = mockExperimentQuery("demo-slug");
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-ff-min")).toHaveTextContent(
        "Firefox 80",
      );
    });
    it("when not set", () => {
      const { experiment } = mockExperimentQuery("demo-slug", {
        firefoxMinVersion: null,
      });
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-ff-min")).toHaveTextContent(
        "Not set",
      );
    });
  });

  describe("renders 'Population %' row as expected", () => {
    it("when set", () => {
      const { experiment } = mockExperimentQuery("demo-slug");
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-population")).toHaveTextContent(
        "40%",
      );
    });
    it("when not set", () => {
      const { experiment } = mockExperimentQuery("demo-slug", {
        populationPercent: null,
      });
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-population")).toHaveTextContent(
        "Not set",
      );
    });
  });

  describe("renders 'Expected enrolled clients' row as expected", () => {
    it("when set", () => {
      const { experiment } = mockExperimentQuery("demo-slug");
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-total-enrolled")).toHaveTextContent(
        "68,000",
      );
    });
    it("when not set", () => {
      const { experiment } = mockExperimentQuery("demo-slug", {
        totalEnrolledClients: 0,
      });
      render(<Subject {...{ experiment }} />);
      expect(
        screen.queryByTestId("experiment-total-enrolled"),
      ).not.toBeInTheDocument();
    });
  });

  describe("renders 'Custom audience' row as expected", () => {
    it("when set", () => {
      const { experiment } = mockExperimentQuery("demo-slug");
      render(<Subject {...{ experiment }} />);
      expect(screen.getByTestId("experiment-target")).toHaveTextContent(
        "Us Only",
      );
    });
    it("when not set", () => {
      const { experiment } = mockExperimentQuery("demo-slug", {
        targetingConfigSlug: null,
      });
      render(<Subject {...{ experiment }} />);
      expect(screen.queryByTestId("experiment-target")).not.toBeInTheDocument();
    });
  });
});

const Subject = ({
  experiment,
}: {
  experiment: getExperiment_experimentBySlug;
}) => (
  <MockedCache>
    <TableSummary {...{ experiment }} />
  </MockedCache>
);
