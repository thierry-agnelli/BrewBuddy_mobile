import { StyleSheet } from "react-native";
import { theme } from "@theme";

/**
 * IngredientList
 */

const styles = StyleSheet.create({
  mashing: {
    flex: 1,
  },
  optionsBox: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  restSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  restsBox: {
    flex: 8,
    alignItems: "center",
  },
  multiRestLabel: {
    color: theme.color.primary,
    fontWeight: "bold",
  },
});

/* Exports */
export { styles };
