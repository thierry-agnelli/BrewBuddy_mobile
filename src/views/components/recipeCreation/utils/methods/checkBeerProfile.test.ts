import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import lodash from "lodash";

import { recipeStore } from "../../store/store.ts";
import { BASE_MOCKED_STATE } from "../../store/tests/mocks.ts";
import { checkBeerProfile } from "./checkBeerProfile.ts";
import { RecipeState } from "../../store/models/RecipeState.ts";

/**
 * Check beer profile.
 */
describe("check beer profile", () => {
  it("Should be defined", () => {
    expect(checkBeerProfile).toBeDefined();
  });

  let mockedRecipeState: RecipeState;

  beforeEach(() => {
    mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
  });

  describe("Tests", () => {
    it("Should return true if all values are ok", () => {
      mockedRecipeState.beerProfile = {
        name: "Test",
        type: "NEIPA",
        description: "this is a test",
        ibu: 99,
        ebc: 99,
      };

      jest.spyOn(recipeStore, "getState").mockReturnValue(mockedRecipeState);

      const result = checkBeerProfile();

      expect(result).toBeTruthy();
    });

    it("Should return false if one value is  not ok", () => {
      mockedRecipeState.beerProfile = {
        name: "Test",
        type: "",
        description: "this is a test",
        ibu: 99,
        ebc: 99,
      };

      jest.spyOn(recipeStore, "getState").mockReturnValue(mockedRecipeState);

      const result = checkBeerProfile();

      expect(result).toBeFalsy();
    });
  });
});
