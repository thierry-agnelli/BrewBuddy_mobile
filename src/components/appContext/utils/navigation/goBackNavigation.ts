import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList, Routes } from "@models";
import { NavigationContainerRefWithCurrent } from "@react-navigation/native";

/**
 * Navigation go back.
 */
function goBackNavigation(
  navigation:
    | DrawerNavigationProp<DrawerParamList>
    | NavigationContainerRefWithCurrent<DrawerParamList>,
  navigationHistory: Routes[],
) {
  // Remove current navigation view from History.
  navigationHistory.pop();

  // Get previous navigation view
  const previousView = navigationHistory[navigationHistory.length - 1];
  // If no previous view standard device back button behaviour
  if (!previousView) return false;

  // Navigate to previous view
  navigation.navigate(previousView, {});
  // Block standard device back button behaviour to safely navigate
  return true;
}

/* Exports */
export { goBackNavigation };
