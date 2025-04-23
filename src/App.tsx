import { AppContextProvider } from "@components";
import { NavigationProvider, Router } from "@router";

/**
 * App component.
 */
function App(): React.JSX.Element {
  return (
    <AppContextProvider>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </AppContextProvider>
  );
}

/* Exports */
export default App;
