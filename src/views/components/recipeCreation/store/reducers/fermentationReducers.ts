import { PayloadAction } from "@reduxjs/toolkit";

import { Fermentation, FermentationStepData } from "../../models";
import { RecipeState, FermentationPayLoad } from "../models/RecipeState";

/**
 * Update fermentation.
 */
function fermentationReducers<
  S extends keyof Fermentation,
  K extends keyof FermentationStepData,
>(state: RecipeState, actions: PayloadAction<FermentationPayLoad<S, K>>) {
  const { step, fermentationKey, value } = actions.payload;

  state.fermentation[step][fermentationKey] = value;
}

/* Exports */
export { fermentationReducers };
