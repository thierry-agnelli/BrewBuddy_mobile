import { createContext, ReactElement, useState } from "react";

type Token = string | null;

/**
 * AppContext values.
 */
type AppContextValues = {
  authToken: Token;
  setAuthToken: (token: Token) => void;
};

const baseContextValues: AppContextValues = {
  authToken: null,
  setAuthToken: () => {},
};

const AppContext = createContext<AppContextValues>(baseContextValues);

/**
 * App context provider.
 */
function AppContextProvider(props: { children: ReactElement }) {
  const [authToken, setAuthToken] = useState<Token>(null);

  const value: AppContextValues = {
    authToken,
    setAuthToken,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

/* Exports */
export { AppContextProvider, AppContext };
export type { AppContextValues };
