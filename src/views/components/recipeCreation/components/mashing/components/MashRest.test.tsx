import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import * as ReducersModule from "../../../store/store.ts";
import { MashRest } from "./MashRest.tsx";

/**
 * MashRest component test.
 */

describe("MashRest component test", () => {
  it("Should be defined", () => {
    expect(MashRest).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render with one rest", () => {
      const { getByTestId, getAllByTestId } = render(
        <MashRest multiRest={false} />,
      );

      const mashRest = getByTestId("mash-rest");
      const rests = getAllByTestId("rest");
      expect(mashRest).toBeDefined();
      expect(rests.length).toBe(1);
    });

    it("Should render with multi-rests", async () => {
      const { getByTestId, getAllByTestId, getByText } = render(
        <MashRest multiRest />,
      );

      let rests = getAllByTestId("rest");
      const restLabel = getByText("Palier 1");
      const addButton = getByTestId("button");

      expect(rests.length).toBe(3);
      expect(restLabel).toBeDefined();

      fireEvent.press(addButton);

      await waitFor(() => {
        rests = getAllByTestId("rest");

        expect(rests.length).toBe(4);
      });
    });

    it("Should set store", async () => {
      // Spies
      const updateMashRestSpy = jest.spyOn(ReducersModule, "updateMashRest");

      const { getByTestId } = render(<MashRest multiRest={false} />);

      const temperatureInput = getByTestId("temperature-input");
      const durationInput = getByTestId("duration-input");

      fireEvent.changeText(temperatureInput, "999");

      await waitFor(() => {
        expect(updateMashRestSpy).toHaveBeenCalledWith({
          restKey: "temperature",
          restIndex: 0,
          value: 999,
        });
      });

      fireEvent.changeText(durationInput, "42");

      await waitFor(() => {
        expect(updateMashRestSpy).toHaveBeenCalledWith({
          restKey: "duration",
          restIndex: 0,
          value: 42,
        });
      });
    });
  });
});
