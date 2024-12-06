import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { Header } from "./Header";

/**
 *  Header Component test.
 */

describe("ViewWrapper component test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Header).toBeDefined();
  });

  // Component test
  describe("Tests", () => {
    it("Should render", () => {
      const { getByText } = render(<Header />);

      expect(getByText("Logo")).toBeTruthy();
    });
  });
});
