/**
 * Simulation state.
 */
type SimulationState = {
  currentTemperature: number;
  underBounds: boolean;
  overBounds: boolean;
  control: {
    temperature: number;
    tempReached: boolean;
    min: number;
    max: number;
  };
};

/* Exports */
export type { SimulationState };
