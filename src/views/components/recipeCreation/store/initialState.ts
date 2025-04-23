import { RecipeState } from "./models/RecipeState.ts";
import { IngredientsCategory } from "@models";
import { RecipeIngredients } from "../models";

/**
 * Initial store value.
 */
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

/* Exports */
export { initialRecipeState };
