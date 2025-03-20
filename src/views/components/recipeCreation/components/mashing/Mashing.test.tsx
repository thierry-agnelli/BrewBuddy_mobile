import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import * as ReducersModule from "../../store/store.ts";
import { Mashing } from "./Mashing.tsx";
import * as MashRestModule from "./components/MashRest.tsx";

/**
 * Mashing component test.
 */

describe("Mashing component test", () => {
  it("Should be defined", () => {
    expect(Mashing).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Mashing />);

      const mashing = getByTestId("mashing");
      expect(mashing).toBeDefined();
    });

    it("Should set multi rest mashing", async () => {
      const MasRestSpy = jest.spyOn(MashRestModule, "MashRest");
      const { getByTestId } = render(<Mashing />);

      const mashRestSwitch = getByTestId("multi-rest-switch");
      fireEvent.call("", mashRestSwitch, "onValueChange");

      await waitFor(() => {
        expect(
          MasRestSpy.mock.calls[MasRestSpy.mock.calls.length - 1][0],
        ).toStrictEqual({
          multiRest: true,
        });
      });
    });

    it("Should set recipe store - mashOut", () => {
      // Spies
      const updateMashOutSpy = jest.spyOn(ReducersModule, "updateMashOut");

      const { getByTestId } = render(<Mashing />);

      const mashOut = getByTestId("pressable-checkbox");
      fireEvent.press(mashOut);

      expect(updateMashOutSpy).toHaveBeenCalledWith({
        value: true,
      });
    });

    it("Should set context - multi rest", () => {
      // Spies
      const updateMultiMashRestsSpy = jest.spyOn(
        ReducersModule,
        "updateMultiMashRests",
      );

      const { getByTestId } = render(<Mashing />);

      const mashOut = getByTestId("multi-rest-switch");
      fireEvent.call("", mashOut, "onValueChange");

      expect(updateMultiMashRestsSpy).toHaveBeenCalledWith({
        value: true,
      });
    });
  });
});
