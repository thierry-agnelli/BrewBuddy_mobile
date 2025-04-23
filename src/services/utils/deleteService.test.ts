import { describe, expect, it, jest } from "@jest/globals";

import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

import { deleteService } from "./deleteService.ts";

/**
 *  Delete service test.
 */

type TestType = {
  propA: string;
  propB: number;
};

describe("Delete service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(deleteService).toBeDefined();
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

      await expect(deleteService({ url: "mockedUrl" })).rejects.toBe(
        serverErrorHandler({
          status: 401,
          error: "mockedError",
          message: "Mocked error.",
        }),
      );
    });

    it("Should handle success request", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest.fn<() => Promise<TestType>>(),
      } as Partial<Response> as Response);

      const response = await deleteService({ url: "mockedUrl" });
      expect(response).toBe("Deleted");
    });
  });
});
