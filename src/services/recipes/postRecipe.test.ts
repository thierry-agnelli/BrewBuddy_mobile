import { describe, expect, it, jest } from "@jest/globals";

// eslint-disable-next-line max-len
import { BASE_MOCKED_RECIPE_MODEL } from "../../views/components/recipeCreation/store/tests/mocks.ts";

import { postRecipe } from "@services";
import { RecipeModelResponse, ServerError } from "@models";

import { serverErrorHandler } from "@utils";

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
      const mockedResponse = {
        ...BASE_MOCKED_RECIPE_MODEL,
        _id: "recipeId",
        isRecipeDoneWriting: true,
        isInBlackList: false,
      };

      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<RecipeModelResponse>>()
          .mockResolvedValueOnce(mockedResponse),
      } as Partial<Response> as Response);

      const result = await postRecipe(BASE_MOCKED_RECIPE_MODEL, "authToken");

      expect(result).toStrictEqual(mockedResponse);
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
