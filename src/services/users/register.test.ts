import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { register } from "@services";
import { env } from "@configs";

import * as postModule from "../utils/postService.ts";

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

    it("Should call post service", async () => {
      // Mocks
      const postSpy = jest
        .spyOn(postModule, "postService")
        .mockResolvedValue({ res: "ok" });
      const mockedUrl = `${env.API_URL}/api/users`;
      const mockedUserData = {
        email: "test@mocks.com",
        password: "password",
        pseudo: "Test",
      };

      const response = await register(mockedUserData);

      expect(postSpy).toBeCalledWith({ url: mockedUrl, body: mockedUserData });
      expect(response).toBe("Success");
    });
  });
});
