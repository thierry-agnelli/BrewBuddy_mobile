import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { Fermentation } from "./Fermentation.tsx";

/**
 * Fermentation component test.
 */

describe("Fermentation component test", () => {
  it("Shoud be defined", () => {
    expect(Fermentation).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Fermentation />);

      const fermentation = getByTestId("fermentation");
      expect(fermentation).toBeDefined();
    });
  });
});
