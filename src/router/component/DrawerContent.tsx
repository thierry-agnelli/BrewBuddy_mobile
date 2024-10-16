import { View, Text } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

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

  /* Render */
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text>BB Menu</Text>
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
      <View style={styles.footer}>
        <DrawerItem label="Fermer" onPress={() => navigation.closeDrawer()} />
      </View>
    </DrawerContentScrollView>
  );
}

/* Export */
export { DrawerContent };
