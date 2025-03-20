import { beforeEach, describe, expect, it } from "@jest/globals";
import lodash from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";

import { RecipeState, FermentationPayLoad } from "../models/RecipeState";
import { fermentationReducers } from "./fermentationReducers.ts";
import { BASE_MOCKED_STATE } from "../tests/mocks.ts";

/**
 * Fermentation reducers.
 */

describe("Fermentation reducers", () => {
  it("Should be defined", () => {
    expect(fermentationReducers).toBeDefined();
  });

  describe("Tests", () => {
    let mockedRecipeState: RecipeState;

    beforeEach(() => {
      mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
    });

    it("Should update store", () => {
      fermentationReducers<"primary", "temperature">(mockedRecipeState, {
        payload: {
          step: "primary",
          fermentationKey: "temperature",
          value: 999,
        },
      } as PayloadAction<FermentationPayLoad<"primary", "temperature">>);

      expect(mockedRecipeState.fermentation.primary).toStrictEqual({
        temperature: 999,
        duration: 3,
      });
    });
  });
});
