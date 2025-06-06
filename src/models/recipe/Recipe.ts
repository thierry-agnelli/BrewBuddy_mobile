import {
  IngredientsCategory,
  RecipeIngredientModel,
} from "../ingredient/Ingredient.ts";
import { Fermentation } from "../../views/components/recipeCreation/models";

/**
 * Beer Profile model.
 */
type ProfileModel = {
  recipeName: string;
  description: string;
  ebc: number;
  ibu: number;
  style: string;
};

/**
 * Beer Ingredients Model.
 */
type IngredientModel = {
  category: IngredientsCategory;
  ingredients: Array<{
    ingredientID: number;
    name: string;
    quantity: number | null;
    measureUnit: string;
    dryHoping?: boolean;
    sugar: boolean;
  }>;
};

/**
 * Mashing Model.
 */
type MashingModel = {
  multiStage: boolean;
  steps: Array<{
    temperature: number;
    duration: number;
    mashout?: boolean;
  }>;
};

/**
 * Boiling Model.
 */
type BoilingModel = Array<{
  duration: number;
  whenToAdd: number;
  ingredient: Omit<RecipeIngredientModel, "_id">;
}>;

/**
 * Fermenting Model.
 */
type FermentingModel = {
  totalDurationOfBaseFermenting: number;
  steps: Array<{
    name: keyof Fermentation;
    temperature: number;
    duration: number;
  }>;
};

/**
 * Steps model.
 */
type StepsModel = {
  mashing: MashingModel;
  boiling: BoilingModel;
  fermenting: FermentingModel;
};

/**
 * Backend Recipe model.
 */
type RecipeModel = {
  isRecipeDoneWriting: boolean;
  isInBlackList: boolean;
  profil: ProfileModel;
  recipeIngredients: Array<IngredientModel>;
  steps: StepsModel;
};

/**
 * Backend response recipes model.
 */
type RecipeModelResponse = RecipeModel & {
  _id: string;
};

/* Exports */
export type { RecipeModel, RecipeModelResponse, IngredientModel };
