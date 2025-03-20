import { createContext, ReactElement, useEffect, useState } from "react";
import { getIngredients } from "@services";
import { IngredientsCategory, IngredientsList } from "@models";

/**
 * Recipe context values.
 */
type RecipeCreationContextValues = {
  step: number;
  setStep: (step: number) => void;
  ingredientsList: IngredientsList;
};

const RecipeCreationContext = createContext<RecipeCreationContextValues>(
  {} as RecipeCreationContextValues,
);

/**
 * App context provider.
 */
function RecipeCreationContextProvider(props: { children: ReactElement }) {
  const [step, setStep] = useState<number>(0);
  const [ingredientsList, setIngredientsList] = useState<IngredientsList>(
    {} as IngredientsList,
  );

  useEffect(() => {
    getIngredients()
      .then((ingredients) => {
        setIngredientsList(ingredients);
      })
      .catch(() => {
        const categories = Object.values(IngredientsCategory);

        const ingredients: IngredientsList = {} as IngredientsList;

        categories.forEach((category) => {
          ingredients[category] = [];
        });

        setIngredientsList(ingredients);
      });
  }, []);

  const value: RecipeCreationContextValues = {
    step,
    setStep,
    ingredientsList,
  };

  return (
    <RecipeCreationContext.Provider value={value}>
      {props.children}
    </RecipeCreationContext.Provider>
  );
}

/* Exports */
export { RecipeCreationContextProvider, RecipeCreationContext };
export type { RecipeCreationContextValues };
