import { PayloadAction } from "@reduxjs/toolkit";
import { SimulationState } from "../models";

/**
 * Update simulation current temperature.
 */
function temperatureReducer(
  state: SimulationState,
  actions: PayloadAction<number>,
) {
  const currentTemperature = actions.payload;

  state.currentTemperature = currentTemperature;

  state.underBounds = false;
  state.overBounds = false;

  if (
    !state.control.tempReached &&
    currentTemperature === state.control.temperature
  )
    state.control.tempReached = true;

  if (currentTemperature <= state.control.min) {
    state.control.tempReached = false;
    state.underBounds = true;
  }

  if (currentTemperature >= state.control.max) {
    state.control.tempReached = false;
    state.overBounds = true;
  }
}

/* Exports */
export { temperatureReducer };
