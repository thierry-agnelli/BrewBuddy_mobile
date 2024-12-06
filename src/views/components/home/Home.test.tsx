import { describe, expect, it } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
import { Home } from "./Home";

/**
 *  About view test.
 */

describe("Home view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Home).toBeDefined();
  });

  describe("Tests", () => {
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
