import { PropsWithChildren, useEffect } from "react";
import { BackHandler } from "react-native";
import {
  NavigationContainer,
  NavigationState,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useAppContext } from "@hooks";
import { DrawerParamList, Routes } from "@models";

/**
 * Navigation provider
 */
function NavigationProvider(props: PropsWithChildren) {
  const { children } = props;

  const navigationRef = useNavigationContainerRef<DrawerParamList>();

  /* Context */
  const { navigationHistory, goBackNavigation } = useAppContext();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return goBackNavigation(navigationRef);
    });
  }, [goBackNavigation, navigationRef]);

  return (
    <NavigationContainer
      onStateChange={onNavigationHandler}
      ref={navigationRef}
    >
      {children}
    </NavigationContainer>
  );

  /* Events */

  /**
   * On navigation.
   */
  function onNavigationHandler(state?: NavigationState) {
    const previous = navigationHistory[navigationHistory.length - 1];
    const next = state?.routeNames[state?.index];

    if (next && previous !== next)
      navigationHistory.push(state?.routeNames[state?.index] as Routes);
  }
}

/* Exports */
export { NavigationProvider };
