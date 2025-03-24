import { ComponentType, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerScreenViewProps,
  // DrawerScreenViewPropsWithParams,
  Routes,
  RoutesList,
  RouteParameter,
  // unAuthRoutesList,
  // routesList,
} from "@models";
import { Header, ViewWrapper } from "@components";
import { useAuthentication } from "@hooks";
import { theme } from "@theme";

import { DrawerContent } from "../../components";
import { unAuthRoutesList, routesList } from "./routesLists.ts";
// import { RouteProp } from "@react-navigation/native";

/**
 * Screen factory props.
 */
type ScreenFactoryProps<R extends Routes> = {
  Screen: ComponentType<DrawerScreenViewProps<R>>;
  isAuthenticated?: boolean;
};

/**
 * Routers component.
 *
 * @returns {JSX.?Element} : The Router.
 */
function Router() {
  // const Drawer = createDrawerNavigator<DrawerParamList>();
  const Drawer = createDrawerNavigator<RouteParameter>();

  const { isAuthenticated, role } = useAuthentication();

  /* Rener */
  return (
    <Drawer.Navigator
      initialRouteName={Routes.LOGIN}
      // Must declare Drawer component here to get navigator props.
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(drawerProps) => (
        <DrawerContent
          {...drawerProps}
          routes={[
            ...routesList.reduce((acc: string[], route) => {
              // Add routes to panel if user has good privilege.
              if (
                route.drawerMenu &&
                (!route.privilege || role >= route.privilege)
              )
                acc.push(route.name);
              return acc;
            }, []),
          ]}
        />
      )}
      // Enable left navigation panel only on authenticated view.
      screenOptions={{ swipeEnabled: isAuthenticated }}
    >
      {unAuthRoutesList.map((route, index) => (
        <Drawer.Screen
          key={route.name + index}
          name={route.name}
          component={
            screenFactory<typeof route.name>({
              Screen: route.view as ComponentType<
                DrawerScreenViewProps<typeof route.name>
              >,
            }) as RoutesList<typeof route.name>["view"]
          }
          initialParams={route.parameters}
        />
      ))}
      {routesList.map((route, index) => (
        <Drawer.Screen
          key={route.name + index}
          name={route.name}
          component={screenFactory({
            Screen: route.view as ComponentType<
              DrawerScreenViewProps<typeof route.name>
            >,
            isAuthenticated,
          })}
          initialParams={route.parameters}
          options={
            isAuthenticated
              ? {
                  headerStyle: {
                    backgroundColor: theme.color.background,
                  },
                  headerTintColor: theme.color.dark,
                  headerTitle: "",
                  headerRight: Header,
                }
              : undefined
          }
        />
      ))}
    </Drawer.Navigator>
  );
}

/*  External methods */

/**
 * Create Screen wrapping view in base elements.
 *
 * @param {ScreenFactoryProps} screenFactoryProps : Component props.
 */
function screenFactory<R extends Routes>(
  screenFactoryProps: ScreenFactoryProps<R>,
): ComponentType<DrawerScreenViewProps<R>> {
  const { Screen, isAuthenticated } = screenFactoryProps;

  return (props: DrawerScreenViewProps<R>) => {
    const { navigation } = props;

    // Disable Drawer header if logout.
    useEffect(() => {
      navigation.setOptions({
        headerShown: !!isAuthenticated,
      });
    }, [navigation]);

    return (
      <ViewWrapper>
        <Screen {...props} />
      </ViewWrapper>
    );
  };
}

/* Exports */
export { Router };
