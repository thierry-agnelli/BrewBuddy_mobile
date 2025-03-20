import { createContext, ReactElement, useState, useRef } from "react";
import { AuthToken, DrawerParamList, Routes } from "@models";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { goBackNavigation } from "./utils";
import { NavigationContainerRefWithCurrent } from "@react-navigation/native";

/**
 * AppContext values.
 */
type AppContextValues = {
  authToken: AuthToken;
  setAuthToken: (token: AuthToken) => void;
  navigationHistory: Routes[];
  goBackNavigation: (
    navigation:
      | DrawerNavigationProp<DrawerParamList>
      | NavigationContainerRefWithCurrent<DrawerParamList>,
  ) => boolean;
};

const AppContext = createContext<AppContextValues>({} as AppContextValues);

/**
 * App context provider.
 */
function AppContextProvider(props: { children: ReactElement }) {
  const [authToken, setAuthToken] = useState<AuthToken>(null);
  const navigationHistory = useRef<Routes[]>([Routes.LOGIN]);

  const value: AppContextValues = {
    authToken,
    setAuthToken,
    navigationHistory: navigationHistory.current,
    goBackNavigation: (navigation) =>
      goBackNavigation(navigation, navigationHistory.current),
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

/* Exports */
export { AppContextProvider, AppContext };
export type { AppContextValues };
