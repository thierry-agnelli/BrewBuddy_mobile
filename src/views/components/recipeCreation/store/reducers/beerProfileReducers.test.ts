import { beforeEach, describe, expect, it } from "@jest/globals";
import lodash from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";

import { RecipeState, BeerProfilePayload } from "../models/RecipeState.ts";
import { beerProfileReducer } from "./beerProfileReducers.ts";
import { BASE_MOCKED_STATE } from "../tests/mocks.ts";

/**
 * Beer profile reducers.
 */
describe("Beer profile reducers", () => {
  it("Should be defined", () => {
    expect(beerProfileReducer).toBeDefined();
  });

  describe("Tests", () => {
    let mockedRecipeState: RecipeState;

    beforeEach(() => {
      mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
    });

    it("Should update store", () => {
      beerProfileReducer<"name">(mockedRecipeState, {
        payload: {
          beerProfileKey: "name",
          value: "Test-beer",
        },
      } as PayloadAction<BeerProfilePayload<"name">>);

      expect(mockedRecipeState).toStrictEqual({
        ...BASE_MOCKED_STATE,
        beerProfile: {
          ...BASE_MOCKED_STATE.beerProfile,
          name: "Test-beer",
        },
      });
    });
  });
});
