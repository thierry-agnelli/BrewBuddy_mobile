import { beforeEach, describe, expect, it } from "@jest/globals";
import lodash from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  BoilingPayLoad,
  BoilingStepPayLoad,
  RecipeState,
} from "../models/RecipeState.ts";
import { boilingReducer, boilingStepReducer } from "./boilingReducers.ts";
import { BASE_MOCKED_STATE } from "../tests/mocks.ts";

/**
 * Boiling reducers.
 */
describe("Boiling reducers", () => {
  it("Should be defined", () => {
    expect(boilingReducer).toBeDefined();
    expect(boilingStepReducer).toBeDefined();
  });

  describe("Tests", () => {
    let mockedRecipeState: RecipeState;

    beforeEach(() => {
      mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
    });

    it("Should update store", () => {
      boilingReducer(mockedRecipeState, {
        payload: {
          value: [
            {
              key: 0,
              name: "test-malt",
              addingTime: 999,
              isAddingTimeValid: true,
              duration: 10,
              unit: "g",
            },
          ],
        },
      } as PayloadAction<BoilingPayLoad>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        {
          name: "test-malt",
          addingTime: 999,
          isAddingTimeValid: true,
          duration: 10,
          unit: "g",
        },
      ]);
    });

    it("Should add rest step", () => {
      const mockedFirstBoilingStep = {
        name: "test-malt",
        addingTime: 0,
        isAddingTimeValid: true,
        duration: 42,
        unit: "g",
      };
      mockedRecipeState.boiling.boilingSteps.push(mockedFirstBoilingStep);

      boilingStepReducer<"name">(mockedRecipeState, {
        payload: {
          boilingKey: "name",
          stepIndex: 1,
          unit: "g",
          value: "test-hops",
        },
      } as PayloadAction<BoilingStepPayLoad<"name">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        mockedFirstBoilingStep,
        {
          name: "test-hops",
          addingTime: undefined,
          isAddingTimeValid: true,
          duration: 0,
          unit: "g",
        },
      ]);
    });

    it("Should update rest step", () => {
      mockedRecipeState.boiling.boilingSteps = [
        {
          name: "test-malt",
          addingTime: 500,
          isAddingTimeValid: true,
          duration: 10,
          unit: "g",
        },
      ];

      boilingStepReducer<"addingTime">(mockedRecipeState, {
        payload: {
          boilingKey: "addingTime",
          stepIndex: 0,
          value: 999,
        },
      } as PayloadAction<BoilingStepPayLoad<"addingTime">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        {
          name: "test-malt",
          addingTime: 999,
          isAddingTimeValid: true,
          unit: "g",
          duration: 10,
        },
      ]);
    });

    it("Should eval wrong adding time vs previous", () => {
      const mockedFirstBoilingStep = {
        name: "test-malt",
        addingTime: 99,
        isAddingTimeValid: true,
        duration: 42,
        unit: "g",
      };
      mockedRecipeState.boiling.boilingSteps.push(mockedFirstBoilingStep);
      mockedRecipeState.boiling.boilingSteps.push({
        name: "test-hops",
        addingTime: undefined,
        isAddingTimeValid: true,
        duration: 0,
        unit: "g",
      });

      boilingStepReducer<"addingTime">(mockedRecipeState, {
        payload: {
          boilingKey: "addingTime",
          stepIndex: 1,
          unit: "g",
          value: 0,
        },
      } as PayloadAction<BoilingStepPayLoad<"addingTime">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        mockedFirstBoilingStep,
        {
          name: "test-hops",
          addingTime: 0,
          isAddingTimeValid: false,
          duration: 0,
          unit: "g",
        },
      ]);
    });

    it("Should eval wrong adding time vs next", () => {
      const mockedSecondBoilingStep = {
        name: "test-hops",
        addingTime: 42,
        isAddingTimeValid: true,
        duration: 0,
        unit: "g",
      };

      mockedRecipeState.boiling.boilingSteps.push({
        name: "test-malt",
        addingTime: undefined,
        isAddingTimeValid: true,
        duration: 42,
        unit: "g",
      });
      mockedRecipeState.boiling.boilingSteps.push(mockedSecondBoilingStep);

      boilingStepReducer<"addingTime">(mockedRecipeState, {
        payload: {
          boilingKey: "addingTime",
          stepIndex: 0,
          unit: "g",
          value: 99,
        },
      } as PayloadAction<BoilingStepPayLoad<"addingTime">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        {
          name: "test-malt",
          addingTime: 99,
          isAddingTimeValid: false,
          duration: 42,
          unit: "g",
        },
        mockedSecondBoilingStep,
      ]);
    });
  });
});
