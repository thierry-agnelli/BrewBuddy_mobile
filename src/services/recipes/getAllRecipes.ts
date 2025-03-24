import { env } from "@configs";
import { RecipeModelResponse, ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Get all recipes service.
 */
function getAllRecipes(): Promise<RecipeModelResponse[]> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/recipe/all`)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          return Promise.reject(error);
        }
        return res.json();
      })
      .then((json: RecipeModelResponse[]) => {
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
export { getAllRecipes };
