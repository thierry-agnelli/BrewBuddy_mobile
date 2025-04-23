import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";
import { theme } from "@theme";

/**
 * RealisationStart styles.
 */
const styles = StyleSheet.create({
  ingredientSetup: {
    width: "100%",
  },
  ingredientList: {
    width: "100%",
    marginBottom: aspectRatio("height", 5),
    alignItems: "center",
  },
  ingredientCard: {
    width: aspectRatio("width", 60),
  },
  cardTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkBoxBorder: {
    borderColor: theme.color.primary,
  },
});

/* Exports */
export { styles };
