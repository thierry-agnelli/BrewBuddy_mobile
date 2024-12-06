import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
import { About } from "@views";

/**
 *  About view test.
 */

describe("About view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(About).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByText } = render(<About navigation={mockedNavigation} />);

      expect(getByText("A propos.")).toBeTruthy();
    });

    it("Should call goBack navigation method", () => {
      const { getByTestId } = render(<About navigation={mockedNavigation} />);

      const button = getByTestId("back-button");

      fireEvent.press(button);

      expect(mockedNavigation.goBack).toHaveBeenCalled();
    });
  });
});
