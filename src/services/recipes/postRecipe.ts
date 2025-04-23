import { env } from "@configs";
import { AuthToken, RecipeModel, RecipeModelResponse } from "@models";

import { postService } from "../utils/postService.ts";

/**
 * Post recipe service.
 */
async function postRecipe(
  recipe: RecipeModel,
  authToken: AuthToken,
): Promise<RecipeModelResponse> {
  const url = `${env.API_URL}/api/recipe`;
  return await postService<RecipeModel, RecipeModelResponse>({
    url,
    authToken,
    body: recipe,
  });
}

/* Export */
export { postRecipe };
