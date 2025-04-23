import { env } from "@configs";
import { Ingredient, IngredientsCategory, IngredientsList } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Get ingredient service.
 */
async function getIngredients(): Promise<IngredientsList> {
  const response = await getService<Ingredient[]>({
    url: `${env.API_URL}/api/ingredients/all`,
  });
  const categories = Object.values(IngredientsCategory);

  const ingredients: IngredientsList = {} as IngredientsList;

  categories.forEach((category) => {
    ingredients[category] = response.filter((ingredient) => {
      return ingredient.category === category;
    });
  });

  return ingredients;
}

/* Exports */
export { getIngredients };
