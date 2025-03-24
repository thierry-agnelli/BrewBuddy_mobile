import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mocksNavigation, mocksRoute } from "@tests";
import { Lexicon } from "./Lexicon";
import { Routes } from "@models";

/**
 *  Lexicon view test.
 */

describe("About view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Lexicon).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.LEXICON>();
    const mockedRoute = mocksRoute<Routes.LEXICON>();

    it("Should render", () => {
      const { getByTestId } = render(
        <Lexicon navigation={mockedNavigation} route={mockedRoute} />,
      );

      const lexicon = getByTestId("lexicon-view");

      expect(lexicon).toBeDefined();
    });

    it("Should call goBack navigation method", () => {
      const { getByTestId } = render(
        <Lexicon navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("back-button");

      fireEvent.press(button);

      expect(mockedNavigation.goBack).toHaveBeenCalled();
    });
  });
});
