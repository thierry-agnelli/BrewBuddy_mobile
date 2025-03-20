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
 * Ingredients list.
 */
type IngredientsList = Record<IngredientsCategory, Ingredient[]>;

/* Exports */
export { IngredientsCategory };
export type { Ingredient, IngredientsList };
