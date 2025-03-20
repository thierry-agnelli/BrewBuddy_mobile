import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Routes } from "./Routes.ts";

/**
 * Drawer param list.
 */
type DrawerParamList = Record<Routes, undefined>;

/**
 * Drawer screen Views props.
 */
type DrawerScreenViewProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

/* Exports */
export type { DrawerParamList, DrawerScreenViewProps };
