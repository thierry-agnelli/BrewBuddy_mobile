import { describe, expect, it, jest } from "@jest/globals";

import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

import { deleteUser } from "./deleteUser";

/**
 *  Delete user service test.
 */

describe("Delete user service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(deleteUser).toBeDefined();
  });

  describe("tests", () => {
    it("Should reject request", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest.fn<() => Promise<ServerError>>().mockResolvedValueOnce({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      } as Partial<Response> as Response);

      await expect(deleteUser(0, "test-token")).rejects.toBe(
        serverErrorHandler({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      );
    });

    it("Should allow authentication", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest.fn<() => Promise<string>>().mockResolvedValueOnce("deleted"),
      } as Partial<Response> as Response);

      const response = await deleteUser(0, "test-token");
      expect(response).toBe("Deleted");
    });
  });
});
