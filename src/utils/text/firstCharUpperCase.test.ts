import { describe, expect, it } from "@jest/globals";
import { firstCharUpperCase } from "@utils";

/**
 * First Char UpperCase utils.
 */
describe("firstCharUpperCase utils test", () => {
  it("Should be defined", () => {
    expect(firstCharUpperCase).toBeDefined();
  });

  describe("Tests", () => {
    it("Sould convert firstChar to upper case", () => {
      const firstCharUpperCaseString = firstCharUpperCase("test-string");

      expect(firstCharUpperCaseString).toBe("Test-string");
    });
  });
});
