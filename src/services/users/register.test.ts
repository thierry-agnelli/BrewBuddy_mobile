import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { register } from "./register.ts";
import { Form } from "@models";
import { serverErrorHandler } from "@utils";

/* Models */
type ErrorResponse = { statusCode: number };

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
        json: jest.fn<() => Promise<ErrorResponse>>().mockResolvedValueOnce({
          statusCode: 401,
        }),
      } as Partial<Response> as Response);

      await expect(register({} as Form)).rejects.toBe(serverErrorHandler(401));
    });

    it("Should allow authentication", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<Response>>()
          .mockResolvedValueOnce({} as Response),
        text: jest.fn().mockImplementation(() => "Success"),
      } as Partial<Response> as Response);

      const response = await register({} as Form);
      expect(response).toBe("Success");
    });
  });
});
