import { ComponentType, useEffect } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  DrawerParamList,
  DrawerScreenViewProps,
  Routes,
  UserRoles,
} from "@models";
import {
  Home,
  Lexicon,
  Login,
  RecipeCreation,
  Register,
  TermsOfSale,
  TermsOfUse,
} from "@views";
import { Header, ViewWrapper } from "@components";
import { DrawerContent } from "../../components";

import { useAuthentication } from "@hooks";

import { theme } from "@theme";

/**
 * Screen factory props.
 */
type ScreenFactoryProps = {
  Screen: ComponentType<DrawerScreenViewProps>;
  isAuthenticated?: boolean;
};

/**
 * Routes list.
 */
type RoutesList = {
  name: Routes;
  view: ComponentType<DrawerScreenViewProps>;
  privilege?: UserRoles;
};

/**
 * Routers component.
 *
 * @returns {JSX.?Element} : The Router.
 */
function Router() {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  const { isAuthenticated, role } = useAuthentication();

  const unAuthRoutesList: RoutesList[] = [
    { name: Routes.LOGIN, view: Login },
    { name: Routes.REGISTER, view: Register },
  ];

  const routesList: RoutesList[] = [
    { name: Routes.HOME, view: Home },
    {
      name: Routes.RECIPE_CREATION,
      view: RecipeCreation,
      privilege: UserRoles.ADMIN,
    },
    { name: Routes.LEXICON, view: Lexicon },
    { name: Routes.TERMS_OF_USE, view: TermsOfUse },
    { name: Routes.TERMS_OF_SALE, view: TermsOfSale },
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
          routes={[
            ...routesList.reduce((acc: string[], route) => {
              // Add routes to pannel if user has good privilege.
              if (!route.privilege || role >= route.privilege)
                acc.push(route.name);
              return acc;
            }, []),
          ]}
        />
      )}
      // Enable left navigation pannel only on authentaicated view.
      screenOptions={{ swipeEnabled: isAuthenticated }}
    >
      {unAuthRoutesList.map((route, index) => (
        <Drawer.Screen
          key={route.name + index}
          name={route.name}
          component={screenFactory({ Screen: route.view })}
        />
      ))}
      {routesList.map((route, index) => (
        <Drawer.Screen
          key={route.name + index}
          name={route.name}
          component={screenFactory({
            Screen: route.view,
            isAuthenticated,
          })}
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
function screenFactory(screenFactoryProps: ScreenFactoryProps) {
  const { Screen, isAuthenticated } = screenFactoryProps;

  return (props: DrawerScreenViewProps) => {
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
