import { describe, expect, it, jest } from "@jest/globals";

import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

import { updateService } from "./updateService.ts";

type UpdateServiceTest = {
  param: string;
};

type UpdateTestResponse = {
  resValue: number;
};

/**
 *  Update service test.
 */

describe("Update service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(updateService).toBeDefined();
  });

  describe("tests", () => {
    it("Should handle rejected request", async () => {
      // Mocks
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest.fn<() => Promise<ServerError>>().mockResolvedValueOnce({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      } as Partial<Response> as Response);

      const mockedUrl = "mockedUrl";
      const mockedBody = {
        param: "test",
      };

      await expect(
        updateService<UpdateServiceTest>({ url: mockedUrl, body: mockedBody }),
      ).rejects.toBe(
        serverErrorHandler({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      );
    });

    it("Should handle success request", async () => {
      // Mocks
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<UpdateTestResponse>>()
          .mockResolvedValueOnce({ resValue: 42 }),
      } as Partial<Response> as Response);

      const mockedUrl = "mockedUrl";
      const mockedBody = {
        param: "test",
      };

      const response = await updateService<
        UpdateServiceTest,
        UpdateTestResponse
      >({
        url: mockedUrl,
        body: mockedBody,
      });
      expect(response).toStrictEqual({ resValue: 42 });
    });
  });
});
