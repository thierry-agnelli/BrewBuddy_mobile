import { env } from "@configs";
import { RecipeModelResponse } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Validate recipe service.
 */
function getRecipe(recipeId: string) {
  const url = `${env.API_URL}/api/recipe/${recipeId}`;
  return getService<RecipeModelResponse>({ url });
}

/* Exports */
export { getRecipe };
