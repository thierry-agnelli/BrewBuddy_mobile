import { jest } from "@jest/globals";

// eslint-disable-next-line max-len
import { RecipeCreationContextValues } from "../context/RecipeCreationContextProvider.tsx";

import { IngredientsCategory, IngredientsList } from "@models";

/**
 * Mocked recipe creation context values.
 */
const mockedContextValues: RecipeCreationContextValues = {
  step: 0,
  setStep: jest.fn(),
  ingredientsList: Object.values(IngredientsCategory).reduce(
    (acc, category) => {
      acc[category] = Array.from({ length: 3 }, (_, index) => {
        return {
          id: 1,
          name: category + index,
          measureUnit: "g",
          dosage: null,
          category: category,
        };
      });
      return acc;
    },
    {} as IngredientsList,
  ),
  navigate: jest.fn(),
};

/* Exports */
export { mockedContextValues };
