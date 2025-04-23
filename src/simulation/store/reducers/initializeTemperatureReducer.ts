import { PayloadAction } from "@reduxjs/toolkit";
import { SimulationState } from "../models";

type InitializePayload = {
  temperature: number;
  min: number;
  max: number;
};

/**
 * Update simulation current temperature.
 */
function initializeTemperatureReducer(
  state: SimulationState,
  actions: PayloadAction<InitializePayload>,
) {
  const { temperature, min, max } = actions.payload;

  state.control.temperature = temperature;
  state.control.min = min;
  state.control.max = max;

  if (state.currentTemperature < min) {
    state.control.tempReached = false;
    state.underBounds = true;
  }
  if (state.currentTemperature > max) {
    state.control.tempReached = false;
    state.overBounds = true;
  }
}

/* Exports */
export { initializeTemperatureReducer };
