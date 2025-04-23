import { describe, expect, it } from "@jest/globals";
import { shortenText } from "@utils";

/**
 * Shorten text utils.
 */
describe("Shorten text utils test", () => {
  it("Should be defined", () => {
    expect(shortenText).toBeDefined();
  });

  describe("Tests", () => {
    it("Should shorten text", () => {
      const shortenedText = shortenText("test-string", 5);

      expect(shortenedText).toBe("test-(...)");
    });

    it("Should not shorten text", () => {
      const notShortenedText = shortenText("test-string", 50);

      expect(notShortenedText).toBe("test-string");
    });
  });
});
