import { describe, expect, it, jest } from "@jest/globals";

import { authenticate } from "./authenticate.ts";
import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 *  Authenticate service test.
 */

describe("Authenticate service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(authenticate).toBeDefined();
  });

  describe("tests", () => {
    it("Should reject authentication", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest.fn<() => Promise<ServerError>>().mockResolvedValueOnce({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      } as Partial<Response> as Response);

      await expect(
        authenticate({
          email: "test@mocke.com",
          password: "Aze1234!",
        }),
      ).rejects.toBe(
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
        json: jest
          .fn<() => Promise<{ accessToken: string }>>()
          .mockResolvedValueOnce({ accessToken: "Success" }),
      } as Partial<Response> as Response);

      const response = await authenticate({
        email: "test@mocke.com",
        password: "Aze1234!",
      });
      expect(response).toBe("Success");
    });
  });
});
