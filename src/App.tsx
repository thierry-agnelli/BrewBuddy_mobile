import { NavigationContainer } from "@react-navigation/native";

import { Router } from "@router";

/**
 * App component.
 *
 * @returns {JSX.Element} : The App component.
 */
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

/* Exports */
export default App;
