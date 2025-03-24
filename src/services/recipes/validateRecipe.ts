import { env } from "@configs";
import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Validate recipe service.
 */
function validateRecipe(recipeId: string, authToken: string) {
  return new Promise<string>((resolve, reject) =>
    fetch(`${env.API_URL}/api/recipe/validate/${recipeId}`, {
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          return Promise.reject(error);
        }
        resolve("Success");
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Exports */
export { validateRecipe };
