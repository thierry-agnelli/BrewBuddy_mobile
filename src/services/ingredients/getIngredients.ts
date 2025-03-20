import { env } from "@configs";
import {
  Ingredient,
  IngredientsCategory,
  IngredientsList,
  ServerError,
} from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Get ingredient service.
 */
function getIngredients(): Promise<IngredientsList> {
  return new Promise((resolve, reject) => {
    fetch(`${env.API_URL}/api/ingredients/all`)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();

          return Promise.reject(error);
        }

        return res.json();
      })
      .then((jsonIngredients: Ingredient[]) => {
        // Format response to ingredients list.
        const categories = Object.values(IngredientsCategory);

        const ingredients: IngredientsList = {} as IngredientsList;

        categories.forEach((category) => {
          ingredients[category] = jsonIngredients.filter((ingredient) => {
            return ingredient.category === category;
          });
        });

        resolve(ingredients);
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      });
  });
}

/* Exports */
export { getIngredients };
