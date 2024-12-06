import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { Input } from "./Input";

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
  });
});
