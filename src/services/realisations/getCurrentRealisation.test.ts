import { describe, expect, it, jest } from "@jest/globals";
import * as getModule from "../utils/getService.ts";
import { env } from "@configs";
import { getCurrentRealisation } from "./getCurrentRealisation";

/**
 *  Get current realisation service test.
 */

describe("Get current realisation service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(getCurrentRealisation).toBeDefined();
  });

  describe("tests", () => {
    it("Should call get service", () => {
      const getSpy = jest.spyOn(getModule, "getService");
      getCurrentRealisation("test-token");
      const mockUrl = `${env.API_URL}/api/message/current`;
      const mockHeader = {
        Authorization: "Bearer test-token",
        "Content-type": "application/json",
        accept: "application/json",
      };

      expect(getSpy).toBeCalledWith({ url: mockUrl, headers: mockHeader });
    });
  });
});
