import { useContext } from "react";
// eslint-disable-next-line max-len
import { RecipeCreationContext } from "../context/RecipeCreationContextProvider";

function useRecipeCreationContext() {
  return useContext(RecipeCreationContext);
}

/* Exports */
export { useRecipeCreationContext };
