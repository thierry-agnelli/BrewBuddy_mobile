import { describe, expect, it, jest } from "@jest/globals";

import { validateRecipe } from "@services";
import * as getModule from "../utils/getService.ts";
import { env } from "@configs";

/**
 * Validate recipe service test.
 */
describe("Validate recipe service test", () => {
  it("Should be defined", () => {
    expect(validateRecipe).toBeDefined();
  });

  describe("Tests", () => {
    it("Should call get service", () => {
      const getSpy = jest.spyOn(getModule, "getService");
      validateRecipe("some_id", "authToken");
      const mockUrl = `${env.API_URL}/api/recipe/validate/some_id`;
      const mockHeader = {
        Authorization: "Bearer authToken",
        "Content-type": "application/json",
        accept: "application/json",
      };

      expect(getSpy).toBeCalledWith({ url: mockUrl, headers: mockHeader });
    });
  });
});
