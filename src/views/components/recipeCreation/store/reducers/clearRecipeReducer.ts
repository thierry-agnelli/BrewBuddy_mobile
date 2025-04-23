import { initialRecipeState } from "../initialState.ts";

/**
 * Clear store recipe.
 */
function clearRecipeReducer() {
  return initialRecipeState;
}

/* Exports */
export { clearRecipeReducer };
