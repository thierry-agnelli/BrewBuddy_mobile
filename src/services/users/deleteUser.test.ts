import { describe, expect, it, jest } from "@jest/globals";

import { deleteUser } from "./deleteUser";
import * as deleteModule from "../utils/deleteService.ts";

import { env } from "@configs";

/**
 *  Delete user service test.
 */

describe("Delete user service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(deleteUser).toBeDefined();
  });

  describe("tests", () => {
    it("Should call delete service", () => {
      const deleteSpy = jest.spyOn(deleteModule, "deleteService");
      deleteUser(0, "test-token");
      const mockedUrl = `${env.API_URL}/api/users/0`;
      const mockedToken = "test-token";

      expect(deleteSpy).toBeCalledWith({
        url: mockedUrl,
        authToken: mockedToken,
      });
    });
  });
});
