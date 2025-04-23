import { describe, expect, it, jest } from "@jest/globals";
import * as getModule from "../utils/getService.ts";
import { env } from "@configs";
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
    it("Should call get service", () => {
      const getSpy = jest.spyOn(getModule, "getService");
      getUser(0, "test-token");
      const mockUrl = `${env.API_URL}/api/users/0`;
      const mockHeader = {
        Authorization: "Bearer test-token",
        "Content-type": "application/json",
        accept: "application/json",
      };

      expect(getSpy).toBeCalledWith({ url: mockUrl, headers: mockHeader });
    });
  });
});
