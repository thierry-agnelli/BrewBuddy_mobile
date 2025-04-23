import { useContext } from "react";
// eslint-disable-next-line max-len
import { RecipeRealisationContext } from "../context/RecipeRealisationProvider.tsx";

function useRealisationContext() {
  return useContext(RecipeRealisationContext);
}

/* Exports */
export { useRealisationContext };
