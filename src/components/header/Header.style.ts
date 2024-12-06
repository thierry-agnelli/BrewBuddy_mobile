import { StyleSheet } from "react-native";
import { theme } from "@theme";

/* Header style */

const styles = StyleSheet.create({
  logo: {
    color: theme.color.primary,
  },
  headerContainer: {
    width: "100%",
    minHeight: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

/* Exports */
export { styles };
