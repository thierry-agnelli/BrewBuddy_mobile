import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { register, RegisterUserData } from "@services";
import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 *  Register service test.
 */

describe("Register service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(register).toBeDefined();
  });

  describe("tests", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Should reject register", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest
          .fn<() => Promise<Partial<ServerError>>>()
          .mockResolvedValueOnce({
            status: 401,
          }),
      } as Partial<Response> as Response);

      await expect(register({} as RegisterUserData)).rejects.toBe(
        serverErrorHandler({
          status: 401,
          error: "Test-error",
          message: "Test-message",
        }),
      );
    });

    it("Should allow authentication", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<Response>>()
          .mockResolvedValueOnce({} as Response),
        text: jest.fn().mockImplementation(() => "Success"),
      } as Partial<Response> as Response);

      const response = await register({} as RegisterUserData);
      expect(response).toBe("Success");
    });
  });
});
