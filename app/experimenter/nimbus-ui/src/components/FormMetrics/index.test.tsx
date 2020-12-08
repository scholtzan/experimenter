/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { mockExperimentQuery } from "../../lib/mocks";
import { Subject } from "./mocks";
import { getConfig_nimbusConfig_probeSets } from "../../types/getConfig";

describe("FormMetrics", () => {
  const probeSets: getConfig_nimbusConfig_probeSets[] = [
    {
      __typename: "NimbusProbeSetType",
      id: "1",
      name: "Probe Set A",
      slug: "probe-set-a",
      probes: [],
    },
    {
      __typename: "NimbusProbeSetType",
      id: "2",
      name: "Probe Set B",
      slug: "probe-set-b",
      probes: [],
    },
    {
      __typename: "NimbusProbeSetType",
      id: "3",
      name: "Probe Set C",
      slug: "probe-set-c",
      probes: [],
    },
  ];

  it("renders as expected", async () => {
    render(<Subject />);
    await act(async () =>
      expect(screen.getByTestId("FormMetrics")).toBeInTheDocument(),
    );

    expect(
      screen.queryByTestId("tooltip-primary-probe-sets"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("tooltip-secondary-probe-sets"),
    ).toBeInTheDocument();
  });

  it("calls onNext when next clicked", async () => {
    const onNext = jest.fn();
    render(<Subject {...{ onNext }} />);

    const nextButton = screen.getByText("Next");
    await act(async () => void fireEvent.click(nextButton));
    expect(onNext).toHaveBeenCalled();
  });

  it("calls onSave when save clicked", async () => {
    const onSave = jest.fn();
    render(<Subject {...{ onSave }} />);

    const saveButton = screen.getByText("Save");
    await act(async () => void fireEvent.click(saveButton));
    expect(onSave).toHaveBeenCalled();
  });

  it("disables save when loading", async () => {
    const onSave = jest.fn();
    render(<Subject {...{ onSave, isLoading: true }} />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Saving");

    await act(async () => {
      fireEvent.click(submitButton);
      fireEvent.submit(screen.getByTestId("FormMetrics"));
    });

    expect(onSave).not.toHaveBeenCalled();
  });

  it("displays saving button when loading", async () => {
    const { experiment } = mockExperimentQuery("boo");
    const onSave = jest.fn();
    render(<Subject {...{ onSave, experiment, isLoading: true }} />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toHaveTextContent("Saving");
  });

  it("displays saved primary probe sets", async () => {
    const { experiment } = mockExperimentQuery("boo", {
      primaryProbeSets: [
        {
          __typename: "NimbusProbeSetType",
          id: "1",
          name: "Probe Set A",
          slug: "probe-set-a",
        },
      ],
    });

    render(<Subject {...{ experiment }} />);

    const primaryProbeSets = screen.getByTestId("primary-probe-sets");
    expect(primaryProbeSets).toHaveTextContent("Probe Set A");
  });

  it("displays saved secondary probe sets", async () => {
    const { experiment } = mockExperimentQuery("boo", {
      secondaryProbeSets: [
        {
          __typename: "NimbusProbeSetType",
          id: "1",
          name: "Probe Set A",
          slug: "probe-set-a",
        },
      ],
    });
    render(<Subject {...{ experiment, probeSets }} />);

    const secondaryProbeSets = screen.getByTestId("secondary-probe-sets");
    expect(secondaryProbeSets).toHaveTextContent("Probe Set A");
  });

  it("selects a primary probe set and excludes it from secondary probe sets", async () => {
    const { experiment } = mockExperimentQuery("boo", {
      primaryProbeSets: [],
      secondaryProbeSets: [],
    });

    render(<Subject {...{ experiment, probeSets }} />);
    const primaryProbeSets = screen.getByTestId("primary-probe-sets");
    const secondaryProbeSets = screen.getByTestId("secondary-probe-sets");

    fireEvent.keyDown(primaryProbeSets.children[1], { key: "ArrowDown" });
    await act(async () => {
      expect(primaryProbeSets).toHaveTextContent("Probe Set A");
      expect(primaryProbeSets).toHaveTextContent("Probe Set B");
      expect(primaryProbeSets).toHaveTextContent("Probe Set C");
    });

    fireEvent.click(screen.getByText("Probe Set A"));
    await act(async () => {
      expect(primaryProbeSets).toHaveTextContent("Probe Set A");
      expect(primaryProbeSets).not.toHaveTextContent("Probe Set B");
      expect(primaryProbeSets).not.toHaveTextContent("Probe Set C");
    });

    fireEvent.keyDown(secondaryProbeSets.children[1], { key: "ArrowDown" });
    await act(async () => {
      expect(secondaryProbeSets).not.toHaveTextContent("Probe Set A");
      expect(secondaryProbeSets).toHaveTextContent("Probe Set B");
      expect(secondaryProbeSets).toHaveTextContent("Probe Set C");
    });
  });

  it("selects a secondary probe set and excludes it from primary probe sets", async () => {
    const { experiment } = mockExperimentQuery("boo", {
      primaryProbeSets: [],
      secondaryProbeSets: [],
    });

    render(<Subject {...{ experiment, probeSets }} />);

    const primaryProbeSets = screen.getByTestId("primary-probe-sets");
    const secondaryProbeSets = screen.getByTestId("secondary-probe-sets");

    fireEvent.keyDown(secondaryProbeSets.children[1], { key: "ArrowDown" });
    await act(async () => {
      expect(secondaryProbeSets).toHaveTextContent("Probe Set A");
      expect(secondaryProbeSets).toHaveTextContent("Probe Set B");
      expect(secondaryProbeSets).toHaveTextContent("Probe Set C");
    });

    fireEvent.click(screen.getByText("Probe Set A"));
    await act(async () => {
      expect(secondaryProbeSets).toHaveTextContent("Probe Set A");
      expect(secondaryProbeSets).not.toHaveTextContent("Probe Set B");
      expect(secondaryProbeSets).not.toHaveTextContent("Probe Set C");
    });

    fireEvent.keyDown(primaryProbeSets.children[1], { key: "ArrowDown" });
    await act(async () => {
      expect(primaryProbeSets).not.toHaveTextContent("Probe Set A");
      expect(primaryProbeSets).toHaveTextContent("Probe Set B");
      expect(primaryProbeSets).toHaveTextContent("Probe Set C");
    });
  });

  it("allows maximum 2 primary probe sets", async () => {
    const { experiment } = mockExperimentQuery("boo", {
      primaryProbeSets: [],
      secondaryProbeSets: [],
    });

    render(<Subject {...{ experiment, probeSets }} />);

    const primaryProbeSets = screen.getByTestId("primary-probe-sets");

    fireEvent.keyDown(primaryProbeSets.children[1], { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Probe Set A"));

    fireEvent.keyDown(primaryProbeSets.children[1], { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Probe Set B"));

    fireEvent.keyDown(primaryProbeSets.children[1], { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Probe Set C"));
    fireEvent.keyDown(primaryProbeSets.children[1], { key: "Escape" });

    await act(async () => {
      expect(primaryProbeSets).toHaveTextContent("Probe Set A");
      expect(primaryProbeSets).toHaveTextContent("Probe Set B");
      expect(primaryProbeSets).not.toHaveTextContent("Probe Set C");
    });
  });
});
