/* Models */
import { useState } from "react";
import { useEffect } from "react";
import {
  simulationStore,
  updateTemperature,
  initializeControlTemperature,
} from "../store/simuStore.ts";

type UseTemperatureSimulationProps = {
  temperature: number;
  min: number;
  max: number;
};

/**
 * Simulation of temperature probe signal.
 */
function useTemperatureSimulation({
  temperature,
  min,
  max,
}: UseTemperatureSimulationProps) {
  const [currentTemp, setCurrentTemp] = useState<number>(
    simulationStore.getState().currentTemperature,
  );

  useEffect(() => {
    simulationStore.dispatch(
      initializeControlTemperature({ temperature, min, max }),
    );
  }, [max, min, temperature]);

  useEffect(() => {
    let current = currentTemp;

    const intervalId = setInterval(() => {
      const {
        underBounds,
        overBounds,
        control: { tempReached },
      } = simulationStore.getState();

      // Heating
      if (!tempReached && underBounds) {
        current++;
        setCurrentTemp(current);
        simulationStore.dispatch(updateTemperature(current));

        return;
      }

      // Cooling
      if (!tempReached && overBounds) {
        current--;
        setCurrentTemp(current);
        simulationStore.dispatch(updateTemperature(current));
        return;
      }

      // Variation
      const variation = Math.random() > 0.5 ? 1 : -1;
      current += variation;

      setCurrentTemp(current);
      simulationStore.dispatch(updateTemperature(current));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // Need to only execute at component mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentTemp;
}

/* Exports */
export { useTemperatureSimulation };
