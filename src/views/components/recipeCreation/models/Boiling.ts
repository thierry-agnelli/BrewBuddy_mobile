import { RecipeIngredient, IngredientsCategory } from "./Ingredient.ts";

/**
 * Boiling step.
 */
type BoilingStep = {
  name: string;
  addingTime: number | undefined;
  isAddingTimeValid: boolean;
  duration: number;
  unit: string;
};

/**
 * Boiling ingredient list
 */
type BoilingIngredient = RecipeIngredient & {
  category: IngredientsCategory;
};

/**
 * Boiling
 */
type Boiling = { boilingSteps: BoilingStep[] };

/**
 * Draggable item component props.
 */
type DraggableItemProps = BoilingStep & {
  key: number;
};

/* Exports */
export type { Boiling, BoilingStep, BoilingIngredient, DraggableItemProps };
