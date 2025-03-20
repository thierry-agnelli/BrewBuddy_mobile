import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { Button } from "./Button";
import { google } from "@assets";

/**
 * Button component test.
 */

describe("Button component test", () => {
  it("Should be defined", () => {
    expect(Button).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { queryByTestId, getByTestId } = render(
        <Button title={"title-test"} testID={"test-button"} />,
      );

      const button = getByTestId("test-button");
      const buttonTitle = getByTestId("test-button-title");
      const buttonIcon = queryByTestId("test-button-icon");

      // Button
      expect(button).toBeDefined();

      // Should display label
      expect(buttonTitle?.props.children).toBe("title-test");

      // Should bot display icon
      expect(buttonIcon).toBe(null);
    });

    it("Should display icon", () => {
      const { getByTestId } = render(
        <Button title={"title-test"} icon={google} />,
      );

      const buttonIcon = getByTestId("button-icon");

      expect(buttonIcon).toBeDefined();
    });

    it("Should fire onPress event", () => {
      const mockedOnPress = jest.fn();

      const { getByTestId } = render(
        <Button title={"test"} onPress={mockedOnPress} />,
      );

      const button = getByTestId("button");

      fireEvent.press(button);

      expect(mockedOnPress).toHaveBeenCalled();
    });
  });
});
