import { PayloadAction } from "@reduxjs/toolkit";

import { BoilingStep } from "../../models";
import {
  RecipeState,
  BoilingStepPayLoad,
  BoilingPayLoad,
} from "../models/RecipeState";

/**
 * Update boiling.
 */
function boilingReducer(
  state: RecipeState,
  actions: PayloadAction<BoilingPayLoad>,
) {
  const { boiling } = state;
  const { value } = actions.payload;

  boiling.boilingSteps = value.map((boilingStep) => ({
    name: boilingStep.name,
    addingTime: boilingStep.addingTime,
    isAddingTimeValid: boilingStep.isAddingTimeValid,
    unit: boilingStep.unit,
    duration: boilingStep.duration,
  }));

  boiling.boilingSteps.forEach((_, index) => {
    boiling.boilingSteps[index].isAddingTimeValid = checkAddingTime(
      boiling.boilingSteps,
      index,
    );
  });
}

/**
 * Update boiling steps.
 */
function boilingStepReducer<K extends keyof BoilingStep>(
  state: RecipeState,
  actions: PayloadAction<BoilingStepPayLoad<K>>,
) {
  const { boilingSteps } = state.boiling;

  const { boilingKey, stepIndex, unit, value } = actions.payload;

  if (!boilingSteps[stepIndex]) {
    boilingSteps.push({
      name: "",
      addingTime: undefined,
      isAddingTimeValid: true,
      duration: 0,
      unit,
    });
  }

  boilingSteps[stepIndex][boilingKey] = value;

  boilingSteps[stepIndex].isAddingTimeValid = checkAddingTime(
    boilingSteps,
    stepIndex,
  );
}

/* Methods */
function checkAddingTime(boilingSteps: BoilingStep[], stepIndex: number) {
  let isValidAddingTime: boolean = true;

  const previousAddingTime = boilingSteps[stepIndex - 1]?.addingTime;
  const currentAddingTime = boilingSteps[stepIndex]?.addingTime;
  const nextAddingTime = boilingSteps[stepIndex + 1]?.addingTime;

  if (previousAddingTime !== undefined && currentAddingTime !== undefined) {
    isValidAddingTime = previousAddingTime <= currentAddingTime;
  }

  if (
    boilingSteps[stepIndex].isAddingTimeValid &&
    nextAddingTime &&
    currentAddingTime
  ) {
    isValidAddingTime = nextAddingTime >= currentAddingTime;
  }

  return isValidAddingTime;
}

/* Exports */
export { boilingReducer, boilingStepReducer };
