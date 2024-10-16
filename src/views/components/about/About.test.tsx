import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mockedNavigation } from "@helpers";
import { About } from "./About";

/**
 *  About view test.
 */

describe("About view tests", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(About).toBeDefined();
  });

  // View tests
  describe("View tests", () => {
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
