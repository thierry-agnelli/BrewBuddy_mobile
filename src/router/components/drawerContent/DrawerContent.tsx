import { View, Image, Pressable } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { Text } from "@components";
import { useAppContext } from "@hooks";
import { storage } from "@utils";
import { profile, logout } from "@assets";

import { styles } from "./DrawerContent.style";
import { Routes, UserRoles } from "@models";

/* Models */
type DrawerContentProps = DrawerContentComponentProps & {
  routes: string[];
};

/**
 * Drawer Content.
 */
function DrawerContent(props: DrawerContentProps) {
  const { navigation, routes } = props;

  const context = useAppContext();
  const {
    setAuthToken,
    user: { pseudo },
  } = context;

  /* Render */
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BrewBuddy</Text>
      </View>
      <Pressable style={styles.profileBox} onPress={onProfilePressHandler}>
        <View style={styles.profileIconBox}>
          <Image source={profile} style={styles.profileIcon} />
        </View>
        <View style={styles.profileNameBox}>
          <Text>{pseudo}</Text>
        </View>
      </Pressable>
      <View style={styles.routes}>
        {routes.map((route) => (
          <DrawerItem
            key={route}
            label={route}
            onPress={() => navigation.navigate(route)}
          />
        ))}
      </View>

      <Pressable style={styles.footer} onPress={onDisconnectPressHandler}>
        <Image source={logout} style={styles.logoutIcon} resizeMode="stretch" />
      </Pressable>
    </DrawerContentScrollView>
  );

  /* Handler */

  /**
   * Disconnect handler
   */
  function onDisconnectPressHandler() {
    storage.removeItem("authToken");
    setAuthToken(null);
    context.user = {
      id: 0,
      email: "",
      pseudo: "",
      role: UserRoles.USER,
      roleName: UserRoles[UserRoles.USER] as keyof typeof UserRoles,
      iat: 0,
    };
    navigation.navigate(Routes.LOGIN, {});
  }

  /**
   * On profile press handle.
   */
  function onProfilePressHandler() {
    navigation.navigate(Routes.PROFILE, {});
  }
}

/* Export */
export { DrawerContent };
