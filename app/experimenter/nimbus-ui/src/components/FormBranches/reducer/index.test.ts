/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { formBranchesActionReducer, FormBranchesAction } from "./actions";
import { FormBranchesState } from "./state";
import { extractUpdateState } from "./update";
import { MOCK_EXPERIMENT } from "../mocks";

const MOCK_STATE: FormBranchesState = {
  equalRatio: true,
  lastId: 0,
  globalErrors: [],
  featureConfig: MOCK_EXPERIMENT.featureConfig,
  referenceBranch: {
    ...MOCK_EXPERIMENT.referenceBranch!,
    key: "branch-reference",
    errors: {},
    isValid: true,
    isDirty: false,
  },
  treatmentBranches: MOCK_EXPERIMENT.treatmentBranches!.map((branch, idx) => ({
    ...branch!,
    key: `branch-${idx}`,
    errors: {},
    isValid: true,
    isDirty: false,
  })),
};

describe("extractUpdateState", () => {
  it("throws an error if the referenceBranch is null", () => {
    try {
      const state = { ...MOCK_STATE, referenceBranch: null };
      extractUpdateState(state, { referenceBranch: {}, treatmentBranches: [] });
      fail("extractUpdateState should have thrown an exception");
    } catch (error) {
      expect(error.message).toEqual("Control branch is required");
    }
  });

  it("accepts incoming form data", () => {
    const state = { ...MOCK_STATE };
    const formData = {
      referenceBranch: { name: "Name from form" },
      treatmentBranches: [
        { description: "Description 1" },
        { description: "Description 2" },
      ],
    };
    const updateState = extractUpdateState(state, formData);
    expect(updateState.referenceBranch.name).toEqual(
      formData.referenceBranch.name,
    );
    expect(updateState.treatmentBranches![0]!.description).toEqual(
      formData.treatmentBranches[0].description,
    );
    expect(updateState.treatmentBranches![1]!.description).toEqual(
      formData.treatmentBranches[1].description,
    );
  });
});

describe("formBranchesReducer", () => {
  // Most code paths in reducer are exercised in UI tests - these tests
  // catch a few corner cases for the sake of coverage.

  it("yields the same state on an unknown action", () => {
    const oldState = { ...MOCK_STATE };
    const newState = formBranchesActionReducer(
      oldState,
      //@ts-ignore intentionally breaking the type to exercise default case
      { type: "bogusAction" },
    );
    expect(newState).toEqual(oldState);
  });

  it("addBranch creates a new referenceBranch as necessary", () => {
    const oldState = {
      ...MOCK_STATE,
      referenceBranch: null,
      treatmentBranches: null,
    };
    const newState = formBranchesActionReducer(oldState, { type: "addBranch" });
    expect(newState.referenceBranch).not.toBeNull();
  });

  it("addBranch creates a new treatmentBranches array as necessary", () => {
    const oldState = {
      ...MOCK_STATE,
      treatmentBranches: null,
    };
    const newState = formBranchesActionReducer(oldState, { type: "addBranch" });
    expect(Array.isArray(newState.treatmentBranches)).toEqual(true);
  });

  it("addBranch pushes onto existing treatmentBranches array", () => {
    const oldState = {
      ...MOCK_STATE,
      treatmentBranches: [],
    };
    const newState = formBranchesActionReducer(oldState, { type: "addBranch" });
    expect(newState.treatmentBranches!.length).toEqual(1);
  });

  it("removeBranch sets treatmentBranches to empty array if incoming is null", () => {
    const oldState = {
      ...MOCK_STATE,
      treatmentBranches: null,
    };
    const newState = formBranchesActionReducer(oldState, {
      type: "removeBranch",
      idx: 1,
    });
    expect(Array.isArray(newState.treatmentBranches)).toEqual(true);
    expect(newState.treatmentBranches!.length).toEqual(0);
  });

  it("equalRatio does nothing to branches if setting to false", () => {
    const oldState = {
      ...MOCK_STATE,
      referenceBranch: null,
      treatmentBranches: null,
    };
    const newState = formBranchesActionReducer(oldState, {
      type: "setEqualRatio",
      value: false,
    });
    expect(newState).toEqual({ ...oldState, equalRatio: false });
  });

  it("equalRatio set to true skips null branches", () => {
    const oldState = {
      ...MOCK_STATE,
      equalRatio: false,
      referenceBranch: null,
      treatmentBranches: null,
    };
    const newState = formBranchesActionReducer(oldState, {
      type: "setEqualRatio",
      value: true,
    });
    expect(newState).toEqual({ ...oldState, equalRatio: true });
  });

  const commonClearFeatureConfigTest = (action: FormBranchesAction) => () => {
    const oldState = {
      ...MOCK_STATE,
      referenceBranch: {
        ...MOCK_STATE.referenceBranch!,
        featureEnabled: true,
      },
      treatmentBranches: MOCK_STATE.treatmentBranches!.map((branch) => ({
        ...branch,
        featureEnabled: true,
      })),
    };

    const newState = formBranchesActionReducer(oldState, action);

    expect(newState.featureConfig).toBeNull();
    expect(newState.referenceBranch?.featureEnabled).toBe(false);
    expect(
      newState.treatmentBranches?.every(
        (branch) => branch?.featureEnabled === false,
      ),
    ).toEqual(true);
  };

  describe("setFeatureConfig", () => {
    it(
      "disables any enabled features in branches when the config is set to null",
      commonClearFeatureConfigTest({
        type: "setFeatureConfig",
        value: null,
      }),
    );
  });

  describe("removeFeatureConfig", () => {
    it(
      "disables any enabled features in branches when the config is cleared",
      commonClearFeatureConfigTest({
        type: "removeFeatureConfig",
      }),
    );

    it("works without error when no branches are defined", () => {
      const oldState = {
        ...MOCK_STATE,
        referenceBranch: null,
        treatmentBranches: null,
      };

      const newState = formBranchesActionReducer(oldState, {
        type: "removeFeatureConfig",
      });

      expect(newState.featureConfig).toBeNull();
    });
  });

  describe("setSubmitErrors", () => {
    const submitErrors = {
      "*": ["This is bad"],
      reference_branch: {
        name: ["This is really bad"],
      },
      treatment_branches: [
        {
          name: ["This is really bad"],
        },
        {
          name: ["This is really bad"],
        },
      ],
    };

    it("sets global errors and can handle null branches", () => {
      const oldState = {
        ...MOCK_STATE,
        globalErrors: [],
        referenceBranch: null,
        treatmentBranches: null,
      };
      const newState = formBranchesActionReducer(oldState, {
        type: "setSubmitErrors",
        submitErrors,
      });
      expect(newState).toEqual({ ...oldState, globalErrors: ["This is bad"] });
    });

    it("sets branch errors", () => {
      const oldState = {
        ...MOCK_STATE,
      };
      const newState = formBranchesActionReducer(oldState, {
        type: "setSubmitErrors",
        submitErrors,
      });
      expect(newState).toEqual({
        ...oldState,
        globalErrors: submitErrors["*"],
        referenceBranch: {
          ...MOCK_STATE.referenceBranch,
          errors: submitErrors["reference_branch"],
        },
        treatmentBranches: [
          ...MOCK_STATE.treatmentBranches!.map((branch, idx) => ({
            ...branch,
            errors: submitErrors["treatment_branches"][idx],
          })),
        ],
      });
    });

    it("handles undefined errors without exception", () => {
      const oldState = {
        ...MOCK_STATE,
      };
      const newState = formBranchesActionReducer(oldState, {
        type: "setSubmitErrors",
        submitErrors: {
          ...submitErrors,
          treatment_branches: [null, null],
        },
      });
      expect(newState).toEqual({
        ...oldState,
        globalErrors: submitErrors["*"],
        referenceBranch: {
          ...MOCK_STATE.referenceBranch,
          errors: submitErrors["reference_branch"],
        },
        treatmentBranches: [
          ...MOCK_STATE.treatmentBranches!.map((branch) => ({
            ...branch,
            errors: {},
          })),
        ],
      });
    });

    it("returns the same state if no submitErrors", () => {
      const oldState = {
        ...MOCK_STATE,
        globalErrors: [],
        referenceBranch: null,
        treatmentBranches: null,
      };
      const newState = formBranchesActionReducer(oldState, {
        type: "setSubmitErrors",
        submitErrors: null,
      });
      expect(newState).toEqual(oldState);
    });
  });

  describe("clearSubmitErrors", () => {
    it("clears global errors", () => {
      const oldState = {
        ...MOCK_STATE,
        globalErrors: ["This is bad"],
        referenceBranch: null,
        treatmentBranches: null,
      };
      const newState = formBranchesActionReducer(oldState, {
        type: "clearSubmitErrors",
      });
      expect(newState).toEqual({ ...oldState, globalErrors: [] });
    });

    it("clears branch errors", () => {
      const oldState = {
        ...MOCK_STATE,
        globalErrors: ["This is bad"],
        referenceBranch: {
          ...MOCK_STATE.referenceBranch!,
          errors: { name: ["bad name"] },
        },
        treatmentBranches: [
          ...MOCK_STATE.treatmentBranches!.map((branch) => ({
            ...branch,
            errors: { name: ["bad name"] },
          })),
        ],
      };
      const newState = formBranchesActionReducer(oldState, {
        type: "clearSubmitErrors",
      });
      expect(newState).toEqual({
        ...oldState,
        globalErrors: [],
        referenceBranch: {
          ...MOCK_STATE.referenceBranch,
          errors: {},
        },
        treatmentBranches: [
          ...MOCK_STATE.treatmentBranches!.map((branch) => ({
            ...branch,
            errors: {},
          })),
        ],
      });
    });
  });

  describe("commitFormData", () => {
    const formData = {
      referenceBranch: { name: "Name from form" },
      treatmentBranches: [
        { description: "Description 1" },
        { description: "Description 2" },
      ],
    };

    it("accepts incoming form data", () => {
      const oldState = { ...MOCK_STATE };
      const newState = formBranchesActionReducer(oldState, {
        type: "commitFormData",
        formData,
      });
      expect(newState.referenceBranch!.name).toEqual(
        formData.referenceBranch.name,
      );
      expect(newState.treatmentBranches![0]!.description).toEqual(
        formData.treatmentBranches[0].description,
      );
      expect(newState.treatmentBranches![1]!.description).toEqual(
        formData.treatmentBranches[1].description,
      );
    });

    it("does not fail when missing data", () => {
      try {
        const oldState = {
          ...MOCK_STATE,
          referenceBranch: null,
          treatmentBranches: null,
        };
        formBranchesActionReducer(oldState, {
          type: "commitFormData",
          formData,
        });
      } catch (error) {
        fail("formBranchesActionReducer should not have thrown an exception");
      }
    });
  });
});
