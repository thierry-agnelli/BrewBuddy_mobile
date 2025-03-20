import { describe, expect, it } from "@jest/globals";

import {
  recipeStore,
  updateBeerProfile,
  updateIngredients,
  updateMashOut,
  updateMultiMashRests,
  updateMashRest,
  updateBoiling,
  updateBoilingStep,
  updateFermentation,
} from "./store.ts";

/**
 * Recipe store.
 */
describe("recipe store reducers", () => {
  it("Should be defined", () => {
    expect(recipeStore).toBeDefined();
    expect(updateBeerProfile).toBeDefined();
    expect(updateIngredients).toBeDefined();
    expect(updateMashOut).toBeDefined();
    expect(updateMultiMashRests).toBeDefined();
    expect(updateMashRest).toBeDefined();
    expect(updateBoiling).toBeDefined();
    expect(updateBoilingStep).toBeDefined();
    expect(updateFermentation).toBeDefined();
  });

  describe("Tests", () => {
    it("Should update store", () => {});
  });
});
