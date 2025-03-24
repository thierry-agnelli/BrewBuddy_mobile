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
    name: string;
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
  profil: ProfileModel;
  recipeIngredients: Array<IngredientModel>;
  steps: StepsModel;
};

/**
 * Backend response recipes model.
 */
type RecipeModelResponse = RecipeModel & {
  _id: string;
  isRecipeDoneWriting: boolean;
  isInBlackList: boolean;
};

/* Exports */
export type { RecipeModel, RecipeModelResponse, IngredientModel };
