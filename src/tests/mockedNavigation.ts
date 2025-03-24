import { jest } from "@jest/globals";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList, RouteParameter, Routes } from "@models";
import { RouteProp } from "@react-navigation/native";

/**
 * Mocks navigation.
 */
function mocksNavigation<R extends Routes>() {
  return {
    goBack: jest.fn(),
    navigate: jest.fn(),
    setOptions: jest.fn(),
  } as unknown as DrawerNavigationProp<DrawerParamList, R>;
}

/**
 * Mocks route params.
 */
function mocksRoute<R extends Routes>(parameters?: object) {
  if (parameters) return { params: parameters } as RouteProp<RouteParameter, R>;
  else return {} as RouteProp<RouteParameter, R>;
}

/* Exports */
export { mocksNavigation, mocksRoute };
