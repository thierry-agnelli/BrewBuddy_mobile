import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mocksNavigation } from "@tests";

import { Header } from "./Header";
import { Routes } from "@models";

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
    const mockedNavigation = mocksNavigation();

    it("Should render", () => {
      const { getByText } = render(<Header navigation={mockedNavigation} />);

      expect(getByText("BrewBuddy")).toBeTruthy();
    });

    it("Should navigate to Home view", () => {
      const { getByTestId } = render(<Header navigation={mockedNavigation} />);
      const homeButton = getByTestId("header-home-button");

      fireEvent.press(homeButton);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.HOME, {});
    });
  });
});
