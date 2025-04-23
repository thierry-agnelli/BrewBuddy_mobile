import { describe, expect, it, jest } from "@jest/globals";

import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

import { postService } from "./postService.ts";

type PostServiceTest = {
  param: string;
};

type PostTestResponse = {
  resValue: number;
};

/**
 *  Post service test.
 */

describe("Post service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(postService).toBeDefined();
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
        postService<PostServiceTest>({ url: mockedUrl, body: mockedBody }),
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
          .fn<() => Promise<PostTestResponse>>()
          .mockResolvedValueOnce({ resValue: 42 }),
      } as Partial<Response> as Response);

      const mockedUrl = "mockedUrl";
      const mockedBody = {
        param: "test",
      };

      const response = await postService<PostServiceTest, PostTestResponse>({
        url: mockedUrl,
        body: mockedBody,
      });
      expect(response).toStrictEqual({ resValue: 42 });
    });

    it("Should send request without body", async () => {
      // Mocks
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<PostTestResponse>>()
          .mockResolvedValueOnce({ resValue: 42 }),
      } as Partial<Response> as Response);

      const mockedUrl = "mockedUrl";
      const mockedToken = "mockedToken";
      await postService<PostServiceTest, PostTestResponse>({
        url: mockedUrl,
        authToken: mockedToken,
      });

      const expectedFetchParams = {
        method: "POST",
        headers: {
          Authorization: "Bearer mockedToken",
        },
      };

      expect(fetchSpy).toHaveBeenCalledWith(mockedUrl, expectedFetchParams);
    });
  });
});
