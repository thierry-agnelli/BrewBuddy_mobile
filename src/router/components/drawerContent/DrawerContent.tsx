import { View, Image, Pressable } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text } from "@components";
import { useAppContext } from "@hooks";
import { storage } from "@utils";
import { logout } from "@assets";

import { styles } from "./DrawerContent.style";

/* Models */
type DrawerContentProps = DrawerContentComponentProps & {
  routes: string[];
};

/**
 * Drawer Content.
 */
function DrawerContent(props: DrawerContentProps) {
  const { navigation, routes } = props;

  const { setAuthToken } = useAppContext();

  /* Render */
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BrewBuddy</Text>
      </View>
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

  /**
   * Handler
   */

  /**
   * Disconnect handler
   */
  function onDisconnectPressHandler() {
    storage.removeItem("authToken");
    setAuthToken(null);
    navigation.navigate("Login");
  }
}

/* Export */
export { DrawerContent };
