import { createContext, ReactElement, useRef, useState } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavigationContainerRefWithCurrent } from "@react-navigation/native";

import { AuthToken, DrawerParamList, Routes, User, UserRoles } from "@models";

import { goBackNavigation } from "./utils";

/**
 * AppContext values.
 */
type AppContextValues = {
  authToken: AuthToken;
  setAuthToken: (token: AuthToken) => void;
  user: User;
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
    setAuthToken: handleLogin,
    user: {
      id: 0,
      email: "",
      pseudo: "",
      role: UserRoles.USER,
      roleName: UserRoles[UserRoles.USER] as keyof typeof UserRoles,
      iat: 0,
    },
    navigationHistory: navigationHistory.current,
    goBackNavigation: (navigation) =>
      goBackNavigation(navigation, navigationHistory.current),
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );

  /* Methods */
  function handleLogin(token: AuthToken) {
    setAuthToken(token);
  }
}

/* Exports */
export { AppContextProvider, AppContext };
export type { AppContextValues };
