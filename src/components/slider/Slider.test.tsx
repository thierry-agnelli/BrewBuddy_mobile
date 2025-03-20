import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { Slider } from "./Slider.tsx";

/**
 * Slider component test.
 */

describe("Slider component test", () => {
  it("Should be defined", () => {
    expect(Slider).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Slider />);

      const slider = getByTestId("slider");
      expect(slider).toBeDefined();
    });

    it("Should set options", () => {
      const { getByText } = render(<Slider label={"test"} min={20} max={40} />);

      const label = getByText("test: 30");

      expect(label).toBeDefined();
    });

    it("Should fire change event", () => {
      //Mocks
      const mockedOnChange = jest.fn();

      const { getByTestId } = render(<Slider onChange={mockedOnChange} />);

      const slider = getByTestId("base-slider");

      fireEvent.call(20, slider, "onValueChange");

      expect(mockedOnChange).toHaveBeenCalled();
    });
  });
});
