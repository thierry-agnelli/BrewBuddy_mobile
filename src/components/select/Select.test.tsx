import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as aspectRatioModule from "../../utils/styles/aspectRatio";
import { Select } from "./Select.tsx";

type MeasureInWindowCallback = (
  x: number,
  y: number,
  w: number,
  h: number,
) => void;

/**
 * Select component test.
 */

describe("Select component test", () => {
  it("Should be defined", () => {
    expect(Select).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    const mockedMeasureInWindow = jest.fn().mockImplementation((callback) => {
      (callback as MeasureInWindowCallback)(1, 2, 10, 20);
    });

    const mockedData = ["data1", "data2"];

    it("Should render", () => {
      const { getByTestId } = render(<Select data={mockedData} />);

      const select = getByTestId("select");
      expect(select).toBeDefined();
    });

    it("should toggled dropdown visibility", async () => {
      const { getByTestId, queryByTestId } = render(
        <Select data={mockedData} />,
      );

      const select = getByTestId("select");

      await fireEvent.press(select);

      await waitFor(() => {
        const dropdown = queryByTestId("select-dropdown");
        const backdrop = queryByTestId("select-backdrop");
        expect(dropdown).toBeDefined();
        expect(backdrop).toBeDefined();
      });

      await fireEvent.press(select);

      await waitFor(() => {
        const dropdown = queryByTestId("select-dropdown");
        const backdrop = queryByTestId("select-backdrop");

        expect(dropdown).toBeNull();
        expect(backdrop).toBeNull();
      });
    });

    it("Should close dropdown by press on the screen", async () => {
      const { getByTestId, queryByTestId } = render(
        <Select data={mockedData} />,
      );

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      fireEvent.press(select);

      const backdrop = getByTestId("select-backdrop");

      fireEvent.press(backdrop);

      await waitFor(() => {
        const dropdown = queryByTestId("select-dropdown");

        expect(dropdown).toBeNull();
      });
    });

    it("Should select value", async () => {
      const mockedOnSelect = jest.fn();

      const { getByTestId, getAllByTestId, getByText } = render(
        <Select data={mockedData} onSelect={mockedOnSelect} />,
      );

      const select = getByTestId("select-input");

      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      const items = getAllByTestId("select-dropdown-item");

      await fireEvent.press(items[1]);

      waitFor(() => {
        const value = getByText("data2");

        expect(value).toBeDefined();
        expect(mockedOnSelect).toHaveBeenCalled();
      });
    });

    it("Should not overflow screen height", async () => {
      jest.spyOn(aspectRatioModule, "aspectRatio").mockReturnValueOnce(20);

      const mockedOnSelect = jest.fn();

      const { getByTestId, getAllByTestId, getByText } = render(
        <Select data={mockedData} onSelect={mockedOnSelect} />,
      );

      const select = getByTestId("select-input");

      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      const items = getAllByTestId("select-dropdown-item");

      await fireEvent.press(items[1]);

      waitFor(() => {
        const value = getByText("data2");

        expect(value).toBeDefined();
        expect(mockedOnSelect).toHaveBeenCalled();
      });
    });
  });
});
