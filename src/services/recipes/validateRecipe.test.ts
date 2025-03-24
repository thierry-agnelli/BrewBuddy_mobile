import { describe, expect, it, jest } from "@jest/globals";
import { ServerError } from "@models";

import { validateRecipe } from "@services";
import { serverErrorHandler } from "@utils";

/**
 * Validate recipe service test.
 */
describe("Validate recipe service test", () => {
  it("Should be defined", () => {
    expect(validateRecipe).toBeDefined();
  });

  describe("Tests", () => {
    it("Should succesfully get recipe", async () => {
      // Mocks
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<string>>()
          .mockResolvedValueOnce("Response_ok"),
      } as Partial<Response> as Response);

      const response = await validateRecipe("some_id", "authToken");
      expect(response).toStrictEqual("Success");
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

      await expect(validateRecipe("some_id", "authToken")).rejects.toBe(
        serverErrorHandler({
          status: 400,
          error: "Test-error",
          message: "Test-message",
        }),
      );
    });
  });
});
