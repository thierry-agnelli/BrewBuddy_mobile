import { env } from "@configs";
import { RecipeModelResponse } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Get all recipes service.
 */
function getAllRecipes(): Promise<RecipeModelResponse[]> {
  const url = `${env.API_URL}/api/recipe/all`;
  return getService<RecipeModelResponse[]>({ url });
}

/* Exports */
export { getAllRecipes };
