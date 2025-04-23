import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import * as RecipeStoreModule from "../../../store/store.ts";
import { FermentationStep } from "./FermentationStep.tsx";
import { BASE_MOCKED_STATE } from "../../../store/tests/mocks.ts";
/**
 * Fermentation step component test.
 */

describe("Fermentation step component test", () => {
  it("Should be defined", () => {
    expect(FermentationStep).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId, getByText } = render(
        <FermentationStep label={"test-step"} step={"primary"} />,
      );

      const fermentationStep = getByTestId("fermentation-step");
      const label = getByText("test-step");
      expect(fermentationStep).toBeDefined();
      expect(label).toBeDefined();
    });

    it("Should set store", async () => {
      // Spies
      const updateFermentationSpy = jest.spyOn(
        RecipeStoreModule,
        "updateFermentation",
      );

      const { getByTestId } = render(
        <FermentationStep label={"test-step"} step={"primary"} />,
      );

      const temperatureInput = getByTestId("temperature-input");
      const durationInput = getByTestId("duration-input");

      fireEvent.changeText(temperatureInput, "999");

      await waitFor(() => {
        expect(updateFermentationSpy).toHaveBeenCalledWith({
          step: "primary",
          fermentationKey: "temperature",
          value: 999,
        });
      });

      fireEvent.changeText(temperatureInput, "");

      await waitFor(() => {
        expect(updateFermentationSpy).toHaveBeenCalledWith({
          step: "primary",
          fermentationKey: "temperature",
          value: 0,
        });
      });

      fireEvent.changeText(durationInput, "42");

      await waitFor(() => {
        expect(updateFermentationSpy).toHaveBeenCalledWith({
          step: "primary",
          fermentationKey: "duration",
          value: 42,
        });
      });
    });

    it("Should display existing step", () => {
      jest.spyOn(RecipeStoreModule.recipeStore, "getState").mockReturnValue({
        ...BASE_MOCKED_STATE,
        fermentation: {
          ...BASE_MOCKED_STATE.fermentation,
          primary: {
            temperature: 20,
            duration: 30,
          },
        },
      });
      const { getByTestId } = render(
        <FermentationStep label={"test-step"} step={"primary"} />,
      );

      const temperature = getByTestId("temperature-input");
      const duration = getByTestId("duration-input");

      expect(temperature.props.value).toBe("20");
      expect(duration.props.value).toBe("30");
    });
  });
});
