import { describe, expect, it, jest } from "@jest/globals";

import * as updateModule from "../utils/updateService.ts";

import { updateUser } from "./updateUser";

import { env } from "@configs";

/**
 *  Update user service test.
 */

describe("Update user service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(updateUser).toBeDefined();
  });

  describe("tests", () => {
    it("Should call update service", async () => {
      // Mocks
      const updateSpy = jest
        .spyOn(updateModule, "updateService")
        .mockResolvedValue({ res: "Success" });
      const mockedUrl = `${env.API_URL}/api/users`;
      const mockedUserData = {
        pseudo: "Test",
      };
      const mockedToken = "some-token";

      await updateUser(0, mockedUserData, mockedToken);

      expect(updateSpy).toHaveBeenCalledWith({
        url: mockedUrl + "/0",
        body: mockedUserData,
        authToken: mockedToken,
      });
    });
  });
});
