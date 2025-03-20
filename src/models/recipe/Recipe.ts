import { IngredientsCategory } from "../ingredient/Ingredient.ts";
import { Fermentation } from "../../views/components/recipeCreation/models";

/**
 * Beer Profile model.
 */
type ProfileModel = {
  name: string;
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
    quantity: number | null;
    dryHoping?: boolean;
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
  // isRecipeDoneWriting: boolean;
  // isInBlackList: boolean;
  profil: ProfileModel;
  recipeIngredients: Array<IngredientModel>;
  steps: StepsModel;
};

/* Exports */
export type { RecipeModel };
