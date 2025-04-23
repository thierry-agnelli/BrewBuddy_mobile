import { describe, expect, it, jest } from "@jest/globals";

import { getRecipe } from "@services";
import * as getModule from "../utils/getService.ts";
import { env } from "@configs";

/**
 * Get recipe service test.
 */

describe("Get recipe service test", () => {
  it("Should be defined", () => {
    expect(getRecipe).toBeDefined();
  });

  describe("Tests", () => {
    it("Should call get service", () => {
      const getSpy = jest.spyOn(getModule, "getService");
      getRecipe("some_id");
      const mockUrl = `${env.API_URL}/api/recipe/some_id`;

      expect(getSpy).toBeCalledWith({ url: mockUrl });
    });
  });
});
