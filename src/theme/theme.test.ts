import { describe, expect, it } from "@jest/globals";

import { theme } from "@theme";

/**
 *  theme test.
 */

describe("theme helpers test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(theme).toBeTruthy();
  });
});
