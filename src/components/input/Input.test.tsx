import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { Input } from "./Input";
import { theme } from "@theme";

/**
 * Button component test.
 */

describe("Button component test", () => {
  it("Should be defined", () => {
    expect(Input).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId, queryByTestId } = render(<Input />);

      const input = getByTestId("input");
      const label = queryByTestId("input-label");
      const required = queryByTestId("input-required");

      expect(input).toBeDefined();
      expect(label).toBe(null);
      expect(required).toBe(null);
    });

    it("Should be disabled", () => {
      const { getByTestId } = render(<Input editable={false} />);

      const input = getByTestId("input");

      expect(input.props.style).toContainEqual(
        expect.objectContaining({
          backgroundColor: theme.color.disable,
        }),
      );
    });

    it("Should render with label and required", () => {
      const { getByTestId, queryByTestId } = render(
        <Input label="test-input" required />,
      );

      const input = getByTestId("input");
      const label = queryByTestId("input-label");
      const required = queryByTestId("input-required");

      expect(input).toBeDefined();
      expect(label?.props.children).toBe("test-input");
      expect(required?.props.children).toBe(" *");
    });

    it("Should fire onChangeText event", () => {
      const mockedOnChangeText = jest.fn();
      const { getByTestId } = render(
        <Input name="testInput" onChangeText={mockedOnChangeText} />,
      );

      const input = getByTestId("input");

      fireEvent.changeText(input, "input text");

      expect(mockedOnChangeText).toHaveBeenCalledWith({
        name: "testInput",
        value: "input text",
      });
    });

    it("Should not overflow min", () => {
      const mockedOnChangeText = jest.fn();
      const { getByTestId } = render(
        <Input
          name="testInput"
          onChangeText={mockedOnChangeText}
          keyboardType={"numeric"}
          min={10}
        />,
      );

      const input = getByTestId("input");

      fireEvent.changeText(input, "0");

      expect(mockedOnChangeText).toHaveBeenCalledWith({
        name: "testInput",
        value: "10",
      });

      fireEvent.changeText(input, "");

      expect(mockedOnChangeText).toHaveBeenCalledWith({
        name: "testInput",
        value: "10",
      });
    });

    it("Should not overflow max", () => {
      const mockedOnChangeText = jest.fn();
      const { getByTestId } = render(
        <Input
          name="testInput"
          onChangeText={mockedOnChangeText}
          keyboardType={"numeric"}
          max={100}
        />,
      );

      const input = getByTestId("input");

      fireEvent.changeText(input, "1000");

      expect(mockedOnChangeText).toHaveBeenCalledWith({
        name: "testInput",
        value: "100",
      });
    });
  });
});
