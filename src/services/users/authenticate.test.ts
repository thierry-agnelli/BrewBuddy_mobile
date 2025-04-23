import { describe, expect, it, jest } from "@jest/globals";

import * as postModule from "../utils/postService.ts";

import { authenticate } from "./authenticate.ts";
import { env } from "@configs";

/**
 *  Authenticate service test.
 */

describe("Authenticate service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(authenticate).toBeDefined();
  });

  describe("tests", () => {
    it("Should call post service", async () => {
      const postSpy = jest
        .spyOn(postModule, "postService")
        .mockResolvedValue({ accessToken: "user-token" });
      const mockedUrl = `${env.API_URL}/api/login`;
      const mockedCredentials = {
        email: "test@mocks.com",
        password: "password",
      };
      const response = await authenticate(mockedCredentials);

      expect(postSpy).toHaveBeenCalledWith({
        url: mockedUrl,
        body: mockedCredentials,
      });
      expect(response).toBe("user-token");
    });
  });
});
