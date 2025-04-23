/* Const */
import {
  Crushing,
  IngredientSetup,
  Mashing,
  RealisationServiceUnavailable,
  RealisationStart,
} from "../components";
import { startRealisation, realisationWorkflow } from "@services";

import { AuthToken, HeatingEventData, IngredientEventData } from "@models";

const RECIPE_REALISATION_STEP = [
  {
    stepTitle: "Début de la recette.",
    stepComponent: RealisationStart,
    next: (recipeId: string, authToken: AuthToken) =>
      startRealisation(recipeId, authToken),
  },
  {
    stepTitle: "Préparation des ingrédients",
    stepComponent: IngredientSetup,
    next: (recipeId: string, authToken: AuthToken) =>
      realisationWorkflow<IngredientEventData[]>(recipeId, authToken),
  },
  {
    stepTitle: "Concassage des malts",
    stepComponent: Crushing,
    next: (recipeId: string, authToken: AuthToken) =>
      realisationWorkflow<IngredientEventData>(recipeId, authToken),
  },
  {
    stepTitle: "Préparation de l'empâtage",
    stepComponent: Mashing,
    next: (recipeId: string, authToken: AuthToken) =>
      realisationWorkflow<HeatingEventData>(recipeId, authToken),
  },
  {
    stepTitle: "Empâtage",
    stepComponent: Mashing,
    next: (recipeId: string, authToken: AuthToken) =>
      realisationWorkflow<HeatingEventData>(recipeId, authToken),
  },
  {
    stepTitle: "Nous sommes désolés.",
    stepComponent: RealisationServiceUnavailable,
    next: () => {},
  },
];

/* Exports */
export { RECIPE_REALISATION_STEP };
