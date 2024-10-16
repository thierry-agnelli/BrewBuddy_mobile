import { jest, describe, expect, it } from "@jest/globals";

import { mockedNavigation } from "./mockedNavigation";

/**
 *  mockedNavigation helpers test.
 */

describe("mockedNavigation helpers tests", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(jest.isMockFunction(mockedNavigation.goBack)).toBeTruthy();
    expect(jest.isMockFunction(mockedNavigation.navigate)).toBeTruthy();
  });
});
