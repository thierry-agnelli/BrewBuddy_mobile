import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { Banner } from "./Banner";

/**
 * Button component test.
 */

describe("Button component test", () => {
  it("Should be defined", () => {
    expect(Banner).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Banner />);

      const banner = getByTestId("banner-pic");
      expect(banner).toBeDefined();
    });
  });
});
