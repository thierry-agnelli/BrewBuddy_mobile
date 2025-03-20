import { createSlice, configureStore } from "@reduxjs/toolkit";
import { RecipeState } from "./models/RecipeState";

import {
  beerProfileReducer,
  ingredientsReducer,
  mashOutReducer,
  multiMashRestReducer,
  mashRestReducer,
  boilingReducer,
  boilingStepReducer,
  fermentationReducers,
} from "./reducers";
import { IngredientsCategory } from "@models";
import { RecipeIngredients } from "../models";

const initialRecipeState: RecipeState = {
  beerProfile: {
    name: "",
    description: "",
    type: "",
    ebc: 60,
    ibu: 60,
  },
  ingredients: Object.values(IngredientsCategory).reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as RecipeIngredients),
  mashing: {
    mashOut: false,
    mashRests: [],
  },
  boiling: {
    boilingSteps: [],
  },
  fermentation: {
    primary: {
      temperature: 0,
      duration: 0,
    },
    secondary: {
      temperature: 0,
      duration: 0,
    },
    refermenting: {
      temperature: 0,
      duration: 0,
    },
  },
};

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
} = recipeSlice.actions;
export { recipeStore };
