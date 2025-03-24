import { describe, expect, it } from "@jest/globals";
import { goBackNavigation } from "./goBackNavigation";
import { mocksNavigation } from "@tests";
import { Routes } from "@models";

/**
 *  goBackNavigation view test.
 */

describe("goBackNavigation test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(goBackNavigation).toBeDefined();
  });

  describe("Tests", () => {
    it("Should navigate to previous view and return true", () => {
      // Mocks
      const mockedNavigation = mocksNavigation<Routes>();

      const backDeviceButtonBehaviour = goBackNavigation(mockedNavigation, [
        Routes.REGISTER,
        Routes.HOME,
      ]);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(
        Routes.REGISTER,
        {},
      );
      expect(backDeviceButtonBehaviour).toBeTruthy();
    });

    it("Should not navigate to previous view and return false", () => {
      // Mocks
      const mockedNavigation = mocksNavigation<Routes>();

      const backDeviceButtonBehaviour = goBackNavigation(mockedNavigation, [
        Routes.REGISTER,
      ]);

      expect(mockedNavigation.navigate).not.toHaveBeenCalled();
      expect(backDeviceButtonBehaviour).toBeFalsy();
    });
  });
});
