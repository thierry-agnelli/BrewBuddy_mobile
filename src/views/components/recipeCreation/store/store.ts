import { createSlice, configureStore } from "@reduxjs/toolkit";

import {
  beerProfileReducer,
  ingredientsReducer,
  mashOutReducer,
  multiMashRestReducer,
  mashRestReducer,
  boilingReducer,
  boilingStepReducer,
  fermentationReducers,
  clearRecipeReducer,
} from "./reducers";
import { initialRecipeState } from "./initialState.ts";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialRecipeState,
  reducers: {
    updateBeerProfile: beerProfileReducer,
    updateIngredients: ingredientsReducer,
    updateMashOut: mashOutReducer,
    updateMultiMashRests: multiMashRestReducer,
    updateMashRest: mashRestReducer,
    updateBoiling: boilingReducer,
    updateBoilingStep: boilingStepReducer,
    updateFermentation: fermentationReducers,
    clearRecipe: clearRecipeReducer,
  },
});

const recipeStore = configureStore({
  reducer: recipeSlice.reducer,
});

export const {
  updateBeerProfile,
  updateIngredients,
  updateMashOut,
  updateMultiMashRests,
  updateMashRest,
  updateBoiling,
  updateBoilingStep,
  updateFermentation,
  clearRecipe,
} = recipeSlice.actions;
export { recipeStore };
