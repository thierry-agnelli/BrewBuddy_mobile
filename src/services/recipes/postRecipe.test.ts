import { describe, expect, it, jest } from "@jest/globals";

// eslint-disable-next-line max-len
import { BASE_MOCKED_RECIPE_MODEL } from "../../views/components/recipeCreation/store/tests/mocks.ts";

import { postRecipe } from "@services";
import { ServerError } from "@models";

import { serverErrorHandler } from "@utils";

type MockedRecipeResponse = {
  message: string;
};

/**
 * Post recipe service test.
 */

describe("Post recipe service test", () => {
  it("should be defined", () => {
    expect(postRecipe).toBeDefined();
  });

  describe("Tests", () => {
    it("Should successfully post recipe", async () => {
      // Mocks
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<MockedRecipeResponse>>()
          .mockResolvedValueOnce({ message: "Success mocked request" }),
      } as Partial<Response> as Response);

      const result = await postRecipe(BASE_MOCKED_RECIPE_MODEL, "authToken");

      expect(result).toBe("Success");
    });

    it("Should handle request error", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest
          .fn<() => Promise<Partial<ServerError>>>()
          .mockResolvedValueOnce({
            status: 400,
          }),
      } as Partial<Response> as Response);

      await expect(
        postRecipe(BASE_MOCKED_RECIPE_MODEL, "authToken"),
      ).rejects.toBe(
        serverErrorHandler({
          status: 400,
          error: "Test-error",
          message: "Test-message",
        }),
      );
    });
  });
});
