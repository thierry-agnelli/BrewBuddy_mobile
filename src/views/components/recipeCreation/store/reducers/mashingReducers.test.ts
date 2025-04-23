import { beforeEach, describe, expect, it } from "@jest/globals";
import lodash from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  RecipeState,
  MashingPayLoad,
  MashRestPayLoad,
} from "../models/RecipeState.ts";
import {
  mashOutReducer,
  multiMashRestReducer,
  mashRestReducer,
} from "./mashingReducers.ts";
import { BASE_MOCKED_STATE } from "../tests/mocks.ts";

/**
 * Mashing reducers.
 */
describe("Mashing reducers", () => {
  it("Should be defined", () => {
    expect(mashOutReducer).toBeDefined();
    expect(multiMashRestReducer).toBeDefined();
    expect(mashRestReducer).toBeDefined();
  });

  describe("Tests", () => {
    let mockedRecipeState: RecipeState;

    beforeEach(() => {
      mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
    });

    it("Should update mash out store", () => {
      mashOutReducer(mockedRecipeState, {
        payload: {
          value: true,
        },
      } as PayloadAction<MashingPayLoad>);

      expect(mockedRecipeState.mashing).toStrictEqual({
        mashOut: true,
        mashRests: [],
      });
    });

    it("Should not update multi mash-rest to mon mash-rest", () => {
      mockedRecipeState.mashing.mashRests = [
        {
          temperature: 1,
          duration: 1,
        },
      ];

      multiMashRestReducer(mockedRecipeState, {
        payload: {
          value: true,
        },
      } as PayloadAction<MashingPayLoad>);

      expect(mockedRecipeState.mashing.mashRests).toStrictEqual([
        {
          temperature: 1,
          duration: 1,
        },
      ]);
    });

    it("Should update  multi mash-rest to mon mash-rest", () => {
      mockedRecipeState.mashing.mashRests = [
        {
          temperature: 1,
          duration: 1,
        },
        {
          temperature: 2,
          duration: 2,
        },
        {
          temperature: 3,
          duration: 3,
        },
      ];

      multiMashRestReducer(mockedRecipeState, {
        payload: {
          value: false,
        },
      } as PayloadAction<MashingPayLoad>);

      expect(mockedRecipeState.mashing.mashRests).toStrictEqual([
        {
          temperature: 1,
          duration: 1,
        },
      ]);
    });

    it("Should update mash rest", () => {
      mockedRecipeState.mashing.mashRests = [
        {
          temperature: 0,
          duration: 0,
        },
      ];

      mashRestReducer<"duration">(mockedRecipeState, {
        payload: {
          restKey: "duration",
          restIndex: 0,
          value: 10,
        },
      } as PayloadAction<MashRestPayLoad<"duration">>);
      expect(mockedRecipeState.mashing.mashRests).toStrictEqual([
        {
          temperature: 0,
          duration: 10,
        },
      ]);
    });

    it("Should set mash rest", () => {
      mashRestReducer<"duration">(mockedRecipeState, {
        payload: {
          restKey: "duration",
          restIndex: 0,
          value: 10,
        },
      } as PayloadAction<MashRestPayLoad<"duration">>);
      expect(mockedRecipeState.mashing.mashRests).toStrictEqual([
        {
          temperature: 0,
          duration: 10,
        },
      ]);
    });
  });
});
