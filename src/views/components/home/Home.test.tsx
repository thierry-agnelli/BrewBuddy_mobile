import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mockedNavigation } from "@helpers";
import { Home } from "./Home";

/**
 *  About view test.
 */

describe("Home view tests", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Home).toBeDefined();
  });

  // View tests
  describe("View tests", () => {
    it("Should render", () => {
      const { getByText } = render(<Home navigation={mockedNavigation} />);

      expect(getByText("Votre compagnon de brassage !!")).toBeTruthy();
    });

    it("Should call navigate navigation method", () => {
      const { getByTestId } = render(<Home navigation={mockedNavigation} />);

      const button = getByTestId("navigate-button");

      fireEvent.press(button);

      expect(mockedNavigation.navigate).toHaveBeenCalled();
    });
  });
});
