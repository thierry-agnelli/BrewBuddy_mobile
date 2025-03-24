import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mocksNavigation, mocksRoute } from "@tests";
import { Home } from "./Home";
import { Routes } from "@models";

/**
 *  Home view test.
 */

describe("Home view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Home).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.HOME>();
    const mockedRoute = mocksRoute<Routes.HOME>();

    it("Should render", () => {
      const { getByTestId } = render(
        <Home navigation={mockedNavigation} route={mockedRoute} />,
      );

      const content = getByTestId("home-view");

      expect(content).toBeDefined();
    });

    it("Should call navigate navigation method", () => {
      const { getByTestId } = render(
        <Home navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("navigate-button");

      fireEvent.press(button);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(
        Routes.LEXICON,
        {},
      );
    });
  });
});
