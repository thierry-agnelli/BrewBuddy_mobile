import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
import { Lexicon } from "./Lexicon";

/**
 *  Lexicon view test.
 */

describe("About view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Lexicon).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Lexicon navigation={mockedNavigation} />);

      const lexicon = getByTestId("lexicon-view");

      expect(lexicon).toBeDefined();
    });

    it("Should call goBack navigation method", () => {
      const { getByTestId } = render(<Lexicon navigation={mockedNavigation} />);

      const button = getByTestId("back-button");

      fireEvent.press(button);

      expect(mockedNavigation.goBack).toHaveBeenCalled();
    });
  });
});
