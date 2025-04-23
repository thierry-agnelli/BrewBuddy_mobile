import { env } from "@configs";
import { AuthToken } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Validate recipe service.
 */
function validateRecipe(
  recipeId: string,
  authToken: AuthToken,
): Promise<undefined> {
  const url = `${env.API_URL}/api/recipe/validate/${recipeId}`;
  const headers = {
    accept: "application/json",
    "Content-type": "application/json",
    Authorization: "Bearer " + authToken,
  };
  return getService<undefined>({
    url,
    headers,
  });
}

/* Exports */
export { validateRecipe };
