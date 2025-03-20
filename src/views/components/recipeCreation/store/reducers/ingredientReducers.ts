import { PayloadAction } from "@reduxjs/toolkit";
import { RecipeIngredient } from "../../models";
import { RecipeState, IngredientPayLoad } from "../models/RecipeState";

/**
 * Update Ingredient list.
 */
function ingredientsReducer<K extends keyof RecipeIngredient>(
  state: RecipeState,
  actions: PayloadAction<IngredientPayLoad<K>>,
) {
  const { ingredientIndex, ingredientKey, value, ingredientModel } =
    actions.payload;
  const category = ingredientModel.category;
  const currentIngredientCategory = state.ingredients?.[category];

  if (!currentIngredientCategory[ingredientIndex]) {
    // Create ingredient.
    currentIngredientCategory.push({
      id: 1,
      name: "",
      measureUnit: ingredientModel.measureUnit,
      dosage: ingredientModel.dosage,
      category: ingredientModel.category,
      qty: 0,
    });
  }
  const currentIngredient = currentIngredientCategory[ingredientIndex];

  // Update entry
  currentIngredient[ingredientKey] = value;
}

/* Exports */
export { ingredientsReducer };
