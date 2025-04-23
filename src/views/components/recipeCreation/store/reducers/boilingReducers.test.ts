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
import { Ingredient } from "@models";
import { RecipeIngredient } from "../../models";

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
              ingredient: {} as RecipeIngredient,
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
          ingredient: {},
        },
      ]);
    });

    it("Should add rest step", () => {
      const mockedFirstBoilingStep = {
        name: "test-malt",
        addingTime: 0,
        isAddingTimeValid: true,
        duration: 42,
        ingredient: {} as RecipeIngredient,
      };
      mockedRecipeState.boiling.boilingSteps.push(mockedFirstBoilingStep);

      boilingStepReducer<"name">(mockedRecipeState, {
        payload: {
          boilingKey: "name",
          stepIndex: 1,
          value: "test-hops",
          ingredient: {} as Ingredient,
        },
      } as PayloadAction<BoilingStepPayLoad<"name">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        mockedFirstBoilingStep,
        {
          name: "test-hops",
          addingTime: 0,
          isAddingTimeValid: true,
          duration: 0,
          ingredient: {},
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
          ingredient: {} as RecipeIngredient,
        },
      ];

      boilingStepReducer<"addingTime">(mockedRecipeState, {
        payload: {
          boilingKey: "addingTime",
          stepIndex: 0,
          value: 999,
          ingredient: {},
        },
      } as PayloadAction<BoilingStepPayLoad<"addingTime">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        {
          name: "test-malt",
          addingTime: 999,
          isAddingTimeValid: true,
          duration: 10,
          ingredient: {},
        },
      ]);
    });

    it("Should eval wrong adding time vs previous", () => {
      const mockedFirstBoilingStep = {
        name: "test-malt",
        addingTime: 99,
        isAddingTimeValid: true,
        duration: 42,
        ingredient: {} as RecipeIngredient,
      };
      mockedRecipeState.boiling.boilingSteps.push(mockedFirstBoilingStep);
      mockedRecipeState.boiling.boilingSteps.push({
        name: "test-hops",
        addingTime: 0,
        isAddingTimeValid: true,
        duration: 0,
        ingredient: {} as RecipeIngredient,
      });

      boilingStepReducer<"addingTime">(mockedRecipeState, {
        payload: {
          boilingKey: "addingTime",
          stepIndex: 1,
          value: 0,
          ingredient: {} as Ingredient,
        },
      } as PayloadAction<BoilingStepPayLoad<"addingTime">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        mockedFirstBoilingStep,
        {
          name: "test-hops",
          addingTime: 0,
          isAddingTimeValid: false,
          duration: 0,
          ingredient: {},
        },
      ]);
    });

    it("Should eval wrong adding time vs next", () => {
      const mockedSecondBoilingStep = {
        name: "test-hops",
        addingTime: 42,
        isAddingTimeValid: true,
        duration: 0,
        ingredient: {} as RecipeIngredient,
      };

      mockedRecipeState.boiling.boilingSteps.push({
        name: "test-malt",
        addingTime: 0,
        isAddingTimeValid: true,
        duration: 42,
        ingredient: {} as RecipeIngredient,
      });
      mockedRecipeState.boiling.boilingSteps.push(mockedSecondBoilingStep);

      boilingStepReducer<"addingTime">(mockedRecipeState, {
        payload: {
          boilingKey: "addingTime",
          stepIndex: 0,
          value: 99,
          ingredient: {} as Ingredient,
        },
      } as PayloadAction<BoilingStepPayLoad<"addingTime">>);

      expect(mockedRecipeState.boiling.boilingSteps).toStrictEqual([
        {
          name: "test-malt",
          addingTime: 99,
          isAddingTimeValid: false,
          duration: 42,
          ingredient: {},
        },
        mockedSecondBoilingStep,
      ]);
    });
  });
});
