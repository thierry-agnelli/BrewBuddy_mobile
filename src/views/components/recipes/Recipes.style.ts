import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";

/**
 * Recipes view styles.
 */
const styles = StyleSheet.create({
  recipes: {
    // paddingTop: aspectRatio("height", 5),
    // justifyContent: "space-between",
  },
  recipeCreation: {
    flex: 1,
    justifyContent: "center",
  },
  recipesList: {
    flex: 9,
    width: "85%",
    paddingHorizontal: aspectRatio("width", 3),
  },
});

/* Exports */
export { styles };
