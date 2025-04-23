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
    it("Should convert firstChar to upper case", () => {
      const firstCharUpperCaseString = firstCharUpperCase("test-string");

      expect(firstCharUpperCaseString).toBe("Test-string");
    });

    it("Should handle void string", () => {
      const firstCharUpperCaseString = firstCharUpperCase("");

      expect(firstCharUpperCaseString).toBe("");
    });

    it("Should handle single char", () => {
      const firstCharUpperCaseString = firstCharUpperCase("a");

      expect(firstCharUpperCaseString).toBe("A");
    });
  });
});
