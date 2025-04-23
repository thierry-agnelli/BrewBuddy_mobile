import { createSlice, configureStore } from "@reduxjs/toolkit";

import { SimulationState } from "./models";
import { temperatureReducer, initializeTemperatureReducer } from "./reducers";

const initialSimulationState: SimulationState = {
  currentTemperature: 0,
  underBounds: false,
  overBounds: false,
  control: {
    temperature: 0,
    tempReached: false,
    min: 0,
    max: 0,
  },
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState: initialSimulationState,
  reducers: {
    updateTemperature: temperatureReducer,
    initializeControlTemperature: initializeTemperatureReducer,
  },
});

const simulationStore = configureStore({
  reducer: simulationSlice.reducer,
});

export const { updateTemperature, initializeControlTemperature } =
  simulationSlice.actions;
export { simulationStore };
