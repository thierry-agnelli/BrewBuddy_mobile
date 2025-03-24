import { env } from "@configs";
import { RecipeModel, RecipeModelResponse, ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Post recipe service.
 */
function postRecipe(
  recipe: RecipeModel,
  authToken: string,
): Promise<RecipeModelResponse> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/recipe`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify(recipe),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          return Promise.reject(error);
        }
        return res.json();
      })
      .then((json) => {
        resolve(json);
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Export */
export { postRecipe };
