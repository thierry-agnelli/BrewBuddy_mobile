import { Ingredient, IngredientsCategory } from "@models";

/**
 * Recipe ingredient detail.
 */
type RecipeIngredient = Ingredient & {
  qty: number;
  resugaring?: boolean;
};

/**
 * Recipe ingredients
 */
type RecipeIngredients = Record<IngredientsCategory, RecipeIngredient[]>;

/* Exports */
export { IngredientsCategory };
export type { RecipeIngredients, RecipeIngredient };
