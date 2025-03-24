import { describe, expect, it, jest } from "@jest/globals";
import { RecipeModelResponse, ServerError } from "@models";

// eslint-disable-next-line max-len
import { BASE_MOCKED_RECIPE_MODEL } from "../../views/components/recipeCreation/store/tests/mocks.ts";

import { getAllRecipes } from "@services";
import { serverErrorHandler } from "@utils";

/**
 * Get recipe service test.
 */

describe("Get all recipes service test", () => {
  it("Should be defined", () => {
    expect(getAllRecipes).toBeDefined();
  });

  describe("Tests", () => {
    it("Should successfully get all recipes", async () => {
      const mockedResponse = [
        {
          ...BASE_MOCKED_RECIPE_MODEL,
          _id: "recipeId",
          isRecipeDoneWriting: true,
          isInBlackList: false,
        },
      ];
      // Mocks
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<RecipeModelResponse[]>>()
          .mockResolvedValueOnce(mockedResponse),
      } as Partial<Response> as Response);

      const response = await getAllRecipes();
      expect(response).toStrictEqual(mockedResponse);
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

      await expect(getAllRecipes()).rejects.toBe(
        serverErrorHandler({
          status: 400,
          error: "Test-error",
          message: "Test-message",
        }),
      );
    });
  });
});
