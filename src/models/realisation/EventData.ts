import {
  Ingredient,
  IngredientsCategory,
  RecipeIngredientModel,
} from "../ingredient/Ingredient.ts";

/**
 * Ingredient event data response.
 */
type IngredientEventData = {
  category: IngredientsCategory;
  ingredients: Array<
    RecipeIngredientModel & Pick<Ingredient, "name" | "measureUnit">
  >;
};

/**
 * Heating event data response.
 */
type HeatingEventData = {
  targetedTemp?: number;
  temperature?: number;
  duration?: number;
};

type EventData =
  | IngredientEventData
  | IngredientEventData[]
  | HeatingEventData
  | undefined;

/* Exports */
export type { EventData, IngredientEventData, HeatingEventData };
