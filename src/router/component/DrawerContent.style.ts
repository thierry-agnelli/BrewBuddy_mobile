import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@theme";

const screenHeight = Dimensions.get("window").height;

/**
 *  DrawerContent styles
 */
const styles = StyleSheet.create({
  header: {
    height: screenHeight / 10,
    display: "flex",
    justifyContent: "center",
  },
  routes: {
    minHeight: (3 * screenHeight) / 10,
  },
  footer: {
    height: screenHeight / 10,
    borderTopWidth: 2,
    borderTopColor: theme.color.primary,
  },
});

/* Export */
export { styles };
