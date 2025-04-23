/**
 * Ingredient categories.
 */
enum IngredientsCategory {
  MALTS = "malts",
  HOPS = "houblons",
  YEASTS = "levures",
  MISCELLANEOUS = "divers",
  SUGARS = "sucres",
}

/**
 * Ingredient.
 */
type Ingredient = {
  id: number;
  name: string;
  measureUnit: string;
  dosage: number | null;
  category: IngredientsCategory;
};

/**
 * Recipe Ingredient Model.
 */
type RecipeIngredientModel = {
  ingredientID: number;
  quantity: number;
};

/**
 * Ingredients list.
 */
type IngredientsList = Record<IngredientsCategory, Ingredient[]>;

/* Exports */
export { IngredientsCategory };
export type { Ingredient, IngredientsList, RecipeIngredientModel };
