import { describe, expect, it } from "@jest/globals";
import { initialRecipeState } from "../initialState.ts";

import { clearRecipeReducer } from "./clearRecipeReducer.ts";

/**
 * Clear recipe reducer.
 */
describe("Clear recipe reducer", () => {
  it("Should be defined", () => {
    expect(clearRecipeReducer).toBeDefined();
  });

  describe("Tests", () => {
    it("Should clear Recipe", () => {
      const result = clearRecipeReducer();

      expect(result).toStrictEqual(initialRecipeState);
    });
  });
});
