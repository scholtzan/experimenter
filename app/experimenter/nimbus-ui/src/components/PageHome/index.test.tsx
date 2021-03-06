/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PageHome from ".";
import { mockDirectoryExperimentsQuery, MockedCache } from "../../lib/mocks";
import { getAllExperiments_experiments } from "../../types/getAllExperiments";
import * as apollo from "@apollo/client";

describe("PageHome", () => {
  it("renders as expected", () => {
    render(<Subject />);

    expect(screen.getByTestId("PageHome")).toBeInTheDocument();
    expect(screen.getByText("New experiment")).toBeInTheDocument();
  });
  it("displays loading when experiments are still loading", () => {
    (jest.spyOn(apollo, "useQuery") as jest.Mock).mockReturnValueOnce({
      loading: true,
    });

    render(<Subject experiments={[]} />);

    expect(screen.queryByTestId("page-loading")).toBeInTheDocument();
  });
  it("displays loading when experiments are still loading", async () => {
    await renderAndWaitForLoaded([]);
    expect(screen.queryByText("No experiments found.")).toBeInTheDocument();
  });
  it("displays four Directory Tables (one for each status type)", async () => {
    await renderAndWaitForLoaded();
    expect(screen.queryAllByTestId("DirectoryTable")).toHaveLength(4);
  });
});

const Subject = ({
  experiments,
}: {
  experiments?: getAllExperiments_experiments[];
}) => (
  <MockedCache mocks={[mockDirectoryExperimentsQuery(experiments)]}>
    <PageHome {...{ experiments }} />
  </MockedCache>
);

const renderAndWaitForLoaded = async (
  experiments?: getAllExperiments_experiments[],
) => {
  render(<Subject {...{ experiments }} />);
  await waitForElementToBeRemoved(() => screen.getByTestId("page-loading"));
};
