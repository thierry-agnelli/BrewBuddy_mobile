import { describe, expect, it, jest } from "@jest/globals";
import * as getModule from "../utils/getService.ts";
import { env } from "@configs";
import { startRealisation } from "./startRealisation";

/**
 *  Star realisation service test.
 */

describe("Start realisation service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(startRealisation).toBeDefined();
  });

  describe("tests", () => {
    it("Should call get service", () => {
      const getSpy = jest.spyOn(getModule, "getService");
      startRealisation("some-id", "test-token");
      const mockUrl = `${env.API_URL}/api/message/start/some-id`;
      const mockHeader = {
        Authorization: "Bearer test-token",
        "Content-type": "application/json",
        accept: "application/json",
      };

      expect(getSpy).toBeCalledWith({ url: mockUrl, headers: mockHeader });
    });
  });
});
