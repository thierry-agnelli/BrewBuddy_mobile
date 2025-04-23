import { describe, expect, it, jest } from "@jest/globals";

import * as getModule from "../utils/getService.ts";
import { env } from "@configs";
import { getAllRecipes } from "@services";

/**
 * Get recipe service test.
 */

describe("Get all recipes service test", () => {
  it("Should be defined", () => {
    expect(getAllRecipes).toBeDefined();
  });

  describe("Tests", () => {
    it("Should call get service", () => {
      const getSpy = jest.spyOn(getModule, "getService");
      getAllRecipes();
      const mockUrl = `${env.API_URL}/api/recipe/all`;

      expect(getSpy).toBeCalledWith({ url: mockUrl });
    });
  });
});
