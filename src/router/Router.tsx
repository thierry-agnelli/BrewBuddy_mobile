import { ComponentType } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerScreenViewProps, Routes } from "@models";
import { About, Home, Login, Register } from "@views";
import { Header, ViewWrapper } from "@components";
import { DrawerContent } from "./component";

import { useAppContext } from "@hooks";

import { theme } from "@theme";

/**
 * Routers component.
 *
 * @returns {JSX.?Element} : The Router.
 */
function Router() {
  // const { initialRoutes } = props;

  const Drawer = createDrawerNavigator();

  /* Context */
  const { authToken } = useAppContext();

  const authRoutesList: {
    name: string;
    view: ComponentType<DrawerScreenViewProps>;
  }[] = [
    { name: Routes.HOME, view: Home },
    { name: Routes.ABOUT, view: About },
  ];

  const appRoutesList: {
    name: string;
    view: ComponentType<DrawerScreenViewProps>;
  }[] = [
    { name: Routes.LOGIN, view: Login },
    { name: Routes.REGISTER, view: Register },
  ];

  /* Render */
  return (
    <Drawer.Navigator
      initialRouteName={Routes.LOGIN}
      // Must declare Drawer component here to get navigator props.
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(drawerProps) => (
        <DrawerContent
          {...drawerProps}
          routes={[...authRoutesList.map((route) => route.name)]}
        />
      )}
      screenOptions={{ swipeEnabled: !!authToken }}
    >
      {authRoutesList.map((route, index) => (
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
      {appRoutesList.map((route, index) => (
        <Drawer.Screen
          key={route.name + index}
          name={route.name}
          component={screenFactory(route.view)}
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
