import { beforeEach, describe, expect, it } from "@jest/globals";
import lodash from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";

import { IngredientPayLoad, RecipeState } from "../models/RecipeState.ts";
import { BASE_MOCKED_STATE } from "../tests/mocks.ts";
import { ingredientsReducer } from "./ingredientReducers.ts";
import { Ingredient, IngredientsCategory } from "@models";

/**
 * Ingredient reducers.
 */
describe("Ingredient reducers", () => {
  it("Should be defined", () => {
    expect(ingredientsReducer).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    const mockedIngredientModel: Ingredient = {
      id: 1,
      name: "test-" + IngredientsCategory.MALTS,
      measureUnit: "g",
      dosage: null,
      category: IngredientsCategory.MALTS,
    };
    let mockedRecipeState: RecipeState;

    beforeEach(() => {
      mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
    });

    it("Should update store", () => {
      ingredientsReducer<"qty">(mockedRecipeState, {
        payload: {
          ingredientIndex: 0,
          ingredientKey: "qty",
          value: 999,
          ingredientModel: mockedIngredientModel,
        },
      } as unknown as PayloadAction<IngredientPayLoad<"qty">>);

      expect(mockedRecipeState).toStrictEqual({
        ...BASE_MOCKED_STATE,
        ingredients: {
          ...BASE_MOCKED_STATE.ingredients,
          [IngredientsCategory.MALTS]: [
            {
              id: 1,
              name: "test-malts",
              measureUnit: "g",
              dosage: null,
              category: IngredientsCategory.MALTS,
              qty: 999,
            },
          ],
        },
      });
    });

    it("Should update existing ingredient", () => {
      mockedRecipeState.ingredients[IngredientsCategory.MALTS].push({
        id: 1,
        name: "",
        measureUnit: "g",
        dosage: null,
        category: IngredientsCategory.MALTS,
        qty: 0,
      });

      ingredientsReducer<"qty">(mockedRecipeState, {
        payload: {
          ingredientIndex: 0,
          ingredientKey: "qty",
          value: 999,
          ingredientModel: mockedIngredientModel,
        },
      } as unknown as PayloadAction<IngredientPayLoad<"qty">>);

      expect(mockedRecipeState).toStrictEqual({
        ...BASE_MOCKED_STATE,
        ingredients: {
          ...BASE_MOCKED_STATE.ingredients,
          [IngredientsCategory.MALTS]: [
            {
              id: 1,
              name: "",
              measureUnit: "g",
              dosage: null,
              category: IngredientsCategory.MALTS,
              qty: 999,
            },
          ],
        },
      });
    });
    // it("Should remove current boiling step if qty change", () => {
    //   mockedRecipeState = {
    //     ...mockedRecipeState,
    //     ingredients: {
    //       ...mockedRecipeState.ingredients,
    //       [IngredientsCategory.MALTS]: [
    //         {
    //           id: 1,
    //           name: "test-malt",
    //           measureUnit: "g",
    //           dosage: null,
    //           category: IngredientsCategory.MALTS,
    //           qty: 2000,
    //         },
    //       ],
    //       [IngredientsCategory.HOPS]: [
    //         {
    //           id: 2,
    //           name: "test-hops",
    //           measureUnit: "g",
    //           dosage: null,
    //           category: IngredientsCategory.HOPS,
    //           qty: 25,
    //         },
    //       ],
    //     },
    //     boiling: {
    //       boilingSteps: [
    //         {
    //           name: "test-malt",
    //           addingTime: 999,
    //           isAddingTimeValid: true,
    //           duration: 42,
    //           unit: "g",
    //         },
    //         {
    //           name: "test-malt",
    //           addingTime: 1001,
    //           isAddingTimeValid: true,
    //           duration: 42,
    //           unit: "g",
    //         },
    //         {
    //           name: "test-hops",
    //           addingTime: 25,
    //           isAddingTimeValid: true,
    //           duration: 42,
    //           unit: "g",
    //         },
    //       ],
    //     },
    //   };
    //
    //   ingredientsReducer<"qty">(mockedRecipeState, {
    //     payload: {
    //       ingredientKey: "qty",
    //       ingredientIndex: 0,
    //       value: 1000,
    //       ingredientModel: mockedIngredientModel,
    //     },
    //   } as unknown as PayloadAction<IngredientPayLoad<"qty">>);
    //
    //   expect(mockedRecipeState).toStrictEqual({
    //     ...BASE_MOCKED_STATE,
    //     ingredients: {
    //       ...BASE_MOCKED_STATE.ingredients,
    //       [IngredientsCategory.MALTS]: [
    //         {
    //           id: 1,
    //           name: "test-malt",
    //           measureUnit: "g",
    //           dosage: null,
    //           category: IngredientsCategory.MALTS,
    //           qty: 1000,
    //           availableQty: 1000,
    //         },
    //       ],
    //       [IngredientsCategory.HOPS]: [
    //         {
    //           id: 2,
    //           name: "test-hops",
    //           measureUnit: "g",
    //           dosage: null,
    //           category: IngredientsCategory.HOPS,
    //           qty: 25,
    //           availableQty: 0,
    //         },
    //       ],
    //     },
    //     boiling: {
    //       boilingSteps: [
    //         {
    //           name: "test-hops",
    //           qty: 25,
    //           duration: 42,
    //         },
    //       ],
    //     },
    //   });
    // });
  });
});
