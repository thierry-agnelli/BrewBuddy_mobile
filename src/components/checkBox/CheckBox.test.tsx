import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { CheckBox } from "./CheckBox";

/**
 * CheckBox component test.
 */

describe("CheckBox component test", () => {
  it("Should be defined", () => {
    expect(CheckBox).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId, queryByTestId } = render(<CheckBox />);

      const checkbox = getByTestId("pressable-checkbox");
      const label = queryByTestId("checkbox-label");
      const checkedIcon = queryByTestId("checked-icon");

      expect(checkbox).toBeDefined();
      expect(label).toBe(null);
      expect(checkedIcon).toBe(null);
    });

    it("Should display label", () => {
      const { queryByTestId } = render(<CheckBox label="test checkbox" />);

      const label = queryByTestId("checkbox-label");

      expect(label).toBeDefined();
    });

    it("should toggle", () => {
      const mockedOnChange = jest.fn();
      const { getByTestId } = render(<CheckBox onChange={mockedOnChange} />);

      const checkbox = getByTestId("pressable-checkbox");

      fireEvent.press(checkbox);

      const checkedIcon = getByTestId("checked-icon");

      expect(checkedIcon).toBeDefined();
      expect(mockedOnChange).toHaveBeenCalledWith({
        name: undefined,
        value: true,
      });
    });
  });
});
