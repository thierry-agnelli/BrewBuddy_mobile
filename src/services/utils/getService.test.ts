import { describe, expect, it, jest } from "@jest/globals";

import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

import { getService } from "./getService.ts";

/**
 *  Get service test.
 */

type TestType = {
  propA: string;
  propB: number;
};

describe("Get service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(getService).toBeDefined();
  });

  describe("tests", () => {
    it("Should handle rejected request", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest.fn<() => Promise<ServerError>>().mockResolvedValueOnce({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      } as Partial<Response> as Response);

      await expect(getService({ url: "mockedUrl" })).rejects.toBe(
        serverErrorHandler({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      );
    });

    it("Should handle success request", async () => {
      const mockedUser: TestType = {
        propA: "A",
        propB: 1,
      };
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<TestType>>()
          .mockResolvedValueOnce(mockedUser),
      } as Partial<Response> as Response);

      const response = await getService({ url: "mockedUrl" });
      expect(response).toStrictEqual(mockedUser);
    });
  });
});
