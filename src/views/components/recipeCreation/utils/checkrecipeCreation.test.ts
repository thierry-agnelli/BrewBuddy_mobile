import { describe, expect, it, jest } from "@jest/globals";
import * as checkBeerProfileModule from "./methods/checkBeerProfile.ts";

import { checkRecipeCreation } from "./checkRecipeCreation";

/**
 * Check recipe utils.
 */

describe("Check recipe creation", () => {
  it("Should be defined", () => {
    expect(checkRecipeCreation).toBeDefined();
  });

  describe("Tests", () => {
    it("Should return check value", () => {
      // Mocks
      const checkProfileSpy = jest
        .spyOn(checkBeerProfileModule, "checkBeerProfile")
        .mockReturnValue(true);

      const result = checkRecipeCreation();

      expect(result).toBe(true);
      expect(checkProfileSpy).toBeCalledTimes(1);
    });
  });
});
