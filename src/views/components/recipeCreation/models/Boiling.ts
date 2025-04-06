import { RecipeIngredient } from "./Ingredient.ts";

/**
 * Boiling step.
 */
type BoilingStep = {
  name: string;
  addingTime: number;
  isAddingTimeValid: boolean;
  duration: number;
  ingredient: RecipeIngredient;
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
export type { Boiling, BoilingStep, DraggableItemProps };
