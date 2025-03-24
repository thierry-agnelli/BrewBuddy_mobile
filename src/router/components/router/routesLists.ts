import {
  DrawerScreenViewProps,
  RouteParameter,
  Routes,
  RoutesList,
  UserRoles,
} from "@models";
import {
  Home,
  Lexicon,
  Login,
  Recipe,
  RecipeCreation,
  Recipes,
  Register,
  TermsOfSale,
  TermsOfUse,
} from "@views";
import { ComponentType } from "react";

/**
 *  Create Route item
 *  Used to infer typing of routes lists.
 */
function createRouteItem<R extends Routes>(
  name: R,
  view: ComponentType<DrawerScreenViewProps<R>>,
  parameters: RouteParameter[R],
  drawerMenu: boolean,
  privilege?: UserRoles,
): RoutesList<R> {
  return {
    name,
    view,
    drawerMenu,
    parameters,
    privilege,
  };
}

/**
 * Unauthenticated routes list.
 */
const unAuthRoutesList = [
  createRouteItem(Routes.LOGIN, Login, {}, false),
  createRouteItem(Routes.REGISTER, Register, {}, false),
];

/**
 * Other routes list.
 */
const routesList = [
  createRouteItem(Routes.HOME, Home, {}, true),
  createRouteItem(
    Routes.RECIPE_CREATION,
    RecipeCreation,
    {},
    true,
    UserRoles.ADMIN,
  ),
  createRouteItem(Routes.RECIPES, Recipes, {}, true),
  createRouteItem(
    Routes.RECIPE,
    Recipe,
    {
      recipe: "",
    },
    false,
  ),
  createRouteItem(Routes.LEXICON, Lexicon, {}, true),
  createRouteItem(Routes.TERMS_OF_USE, TermsOfUse, {}, true),
  createRouteItem(Routes.TERMS_OF_SALE, TermsOfSale, {}, true),
];

/* Exports */
export { unAuthRoutesList, routesList };
