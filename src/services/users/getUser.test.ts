import { describe, expect, it, jest } from "@jest/globals";

import { ServerError, UserModel } from "@models";
import { serverErrorHandler } from "@utils";

import { getUser } from "./getUser";

/**
 *  Get user service test.
 */

describe("Get user service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(getUser).toBeDefined();
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

      await expect(getUser(0, "test-token")).rejects.toBe(
        serverErrorHandler({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      );
    });

    it("Should allow authentication", async () => {
      const mockedUser: UserModel = {
        pseudo: "test-user",
        email: "test@test.com",
        iat: 0,
        id: 1,
        role: "USER",
      };
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<UserModel>>()
          .mockResolvedValueOnce(mockedUser),
      } as Partial<Response> as Response);

      const response = await getUser(0, "test-token");
      expect(response).toStrictEqual(mockedUser);
    });
  });
});
