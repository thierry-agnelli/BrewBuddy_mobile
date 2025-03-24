import { env } from "@configs";
import { RecipeModelResponse, ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Validate recipe service.
 */
function getRecipe(recipeId: string) {
  return new Promise<RecipeModelResponse>((resolve, reject) =>
    fetch(`${env.API_URL}/api/recipe/${recipeId}`)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          return Promise.reject(error);
        }
        return res.json();
      })
      .then((json: RecipeModelResponse) => {
        resolve(json);
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Exports */
export { getRecipe };
