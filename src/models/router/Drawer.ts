import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Routes } from "./Routes.ts";
import { RouteProp } from "@react-navigation/native";
import { UserRoles } from "../user/User.ts";
import { ComponentType } from "react";
import { RecipeModelResponse } from "../recipe/Recipe.ts";

/**
 * Drawer param list.
 */
type DrawerParamList = Record<string, object>;

/**
 * Route parameters.
 */
type RouteParameter = {
  [R in Routes]: object;
} & {
  // Routes with parameters
  [Routes.RECIPE]: {
    recipe: RecipeModelResponse | string;
  };
};

/**
 * Drawer screen Views props.
 */
type DrawerScreenViewProps<R extends Routes> = {
  navigation: DrawerNavigationProp<DrawerParamList, R>;
  route: RouteProp<RouteParameter, R>;
};

/**
 * Routes list.
 */
type RoutesList<R extends Routes> = {
  name: R;
  view: ComponentType<DrawerScreenViewProps<R>>;
  parameters: RouteParameter[R];
  drawerMenu: boolean;
  privilege?: UserRoles;
};

/* Exports */
export type {
  DrawerParamList,
  DrawerScreenViewProps,
  RoutesList,
  RouteParameter,
};
