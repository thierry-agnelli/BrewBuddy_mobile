import { describe, expect, it } from "@jest/globals";
import { goBackNavigation } from "./goBackNavigation";
import { mockedNavigation } from "@tests";
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
      const backDeviceButtonBehaviour = goBackNavigation(mockedNavigation, [
        Routes.REGISTER,
        Routes.HOME,
      ]);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.REGISTER);
      expect(backDeviceButtonBehaviour).toBeTruthy();
    });

    it("Should not navigate to previous view and return false", () => {
      const backDeviceButtonBehaviour = goBackNavigation(mockedNavigation, [
        Routes.REGISTER,
      ]);

      expect(mockedNavigation.navigate).not.toHaveBeenCalledWith();
      expect(backDeviceButtonBehaviour).toBeFalsy();
    });
  });
});
