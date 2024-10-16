import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { Header } from "./Header";

/**
 *  Header Component test.
 */

describe("ViewWrapper component tests", () => {
  // Should be defined
  it("Shoukld be defined", () => {
    expect(Header).toBeDefined();
  });

  // Component tests
  describe("Component tests", () => {
    it("Should render", () => {
      const { getByText } = render(<Header />);

      expect(getByText("Logo")).toBeTruthy();
    });
  });
});
