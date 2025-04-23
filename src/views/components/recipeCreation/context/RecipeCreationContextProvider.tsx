import { createContext, ReactElement, useEffect, useState } from "react";
import { getIngredients } from "@services";
import {
  IngredientsCategory,
  IngredientsList,
  RouteParameter,
  Routes,
} from "@models";

/**
 * Recipe creation context provider props.
 */
type RecipeCreationContextProviderProps = {
  children: ReactElement;
  navigate: (routeName: Routes, params: RouteParameter[Routes.RECIPES]) => void;
};

/**
 * Recipe creation context values.
 */
type RecipeCreationContextValues = {
  step: number;
  setStep: (step: number) => void;
  ingredientsList: IngredientsList;
  navigate: (routeName: Routes, params: RouteParameter[Routes.RECIPES]) => void;
};

const RecipeCreationContext = createContext<RecipeCreationContextValues>(
  {} as RecipeCreationContextValues,
);

/**
 * Recipe creation context provider.
 */
function RecipeCreationContextProvider({
  navigate,
  children,
}: RecipeCreationContextProviderProps) {
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
    navigate,
  };

  return (
    <RecipeCreationContext.Provider value={value}>
      {children}
    </RecipeCreationContext.Provider>
  );
}

/* Exports */
export { RecipeCreationContextProvider, RecipeCreationContext };
export type { RecipeCreationContextValues };
