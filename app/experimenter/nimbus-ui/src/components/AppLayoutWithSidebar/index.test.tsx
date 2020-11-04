/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { act, screen, waitFor } from "@testing-library/react";
import AppLayoutWithSidebar from ".";
import { renderWithRouter } from "../../lib/test-utils";
import { BASE_PATH } from "../../lib/constants";
import { RouteComponentProps, Router } from "@reach/router";
import App from "../App";
import { MockedCache, mockExperimentQuery } from "../../lib/mocks";

const { mock } = mockExperimentQuery("my-special-slug");

describe("PageNew", () => {
  it("renders app layout content with children", () => {
    renderWithRouter(
      <MockedCache mocks={[mock]}>
        <AppLayoutWithSidebar>
          <p data-testid="test-child">Hello, world!</p>
        </AppLayoutWithSidebar>
      </MockedCache>,
    );
    expect(screen.getByTestId("AppLayoutWithSidebar")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  describe("navigation links", () => {
    const SidebarRoot: React.FunctionComponent<RouteComponentProps> = () => (
      <MockedCache mocks={[mock]}>
        <AppLayoutWithSidebar>
          <p>Hello, world!</p>
        </AppLayoutWithSidebar>
      </MockedCache>
    );

    it("renders expected URLs", () => {
      renderWithRouter(
        <Router>
          <SidebarRoot path="/:slug" />
        </Router>,
        { route: `/my-special-slug` },
      );
      expect(screen.getByTestId("nav-home")).toHaveAttribute("href", BASE_PATH);
      expect(screen.getByTestId("nav-edit-overview")).toHaveAttribute(
        "href",
        `${BASE_PATH}/my-special-slug/edit/overview`,
      );
      expect(screen.getByTestId("nav-edit-branches")).toHaveAttribute(
        "href",
        `${BASE_PATH}/my-special-slug/edit/branches`,
      );
      expect(screen.getByTestId("nav-request-review")).toHaveAttribute(
        "href",
        `${BASE_PATH}/my-special-slug/request-review`,
      );
    });

    it("renders expected active page class", async () => {
      function pushState(page: string) {
        window.history.pushState(
          {},
          "",
          `${BASE_PATH}/my-special-slug/${page}`,
        );
      }
      const {
        history: { navigate },
      } = renderWithRouter(
        <MockedCache mocks={[mock, mock]}>
          <App basepath="/" />
        </MockedCache>,
        {
          route: `/my-special-slug/`,
        },
      );

      let overviewLink: HTMLElement, branchesLink: HTMLElement;

      pushState("edit/overview");
      await act(() => navigate("/my-special-slug/edit/overview"));
      await waitFor(() => {
        overviewLink = screen.getByTestId("nav-edit-overview");
        branchesLink = screen.getByTestId("nav-edit-branches");
      });
      expect(overviewLink!).toHaveClass("text-primary");
      expect(overviewLink!).not.toHaveClass("text-dark");
      expect(branchesLink!).toHaveClass("text-dark");
      expect(branchesLink!).not.toHaveClass("text-primary");

      pushState("edit/branches");
      await act(() => navigate("/my-special-slug/edit/branches"));
      await waitFor(() => {
        overviewLink = screen.getByTestId("nav-edit-overview");
        branchesLink = screen.getByTestId("nav-edit-branches");
      });
      expect(branchesLink!).toHaveClass("text-primary");
      expect(branchesLink!).not.toHaveClass("text-dark");
      expect(overviewLink!).toHaveClass("text-dark");
      expect(overviewLink!).not.toHaveClass("text-primary");
    });
  });
});