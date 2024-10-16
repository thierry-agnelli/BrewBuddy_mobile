import { ComponentType } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerScreenViewProps } from "./models/DrawerScreenViewProps";
import { About, Home } from "@views";
import { DrawerContent } from "./component";
import { Header, ViewWrapper } from "@components";
import { theme } from "@theme";

/**
 * Routers component.
 *
 * @returns {JSX.?Element} : The Router.
 */
function Router() {
  const Drawer = createDrawerNavigator();

  const routesList: {
    name: string;
    view: ComponentType<DrawerScreenViewProps>;
  }[] = [
    { name: "Home", view: Home },
    { name: "About", view: About },
  ];

  /* Render */
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      // Must delare Drawer component here to get navigator props.
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props) => (
        <DrawerContent
          {...props}
          routes={routesList.map((route) => route.name)}
        />
      )}
    >
      {routesList.map((route, index) => (
        <Drawer.Screen
          key={route.name + index}
          name={route.name}
          component={screenFactory(route.view)}
          options={{
            headerStyle: {
              backgroundColor: "",
            },
            headerTintColor: theme.color.primary,
            headerTitle: "BrewBuddy",
            headerRight: Header,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

/*  External methods */

/**
 * Create Screen wrapping view in base elements.
 *
 * @param {ComponentType<DrawerScreenViewProps>} Screen :
 * The View to pass to router screen.
 *
 * @returns {JSX.Element} : The Screen.
 */
function screenFactory(Screen: ComponentType<DrawerScreenViewProps>) {
  return (props: DrawerScreenViewProps) => (
    <ViewWrapper>
      <Screen {...props} />
    </ViewWrapper>
  );
}

/* Exports */
export { Router };
