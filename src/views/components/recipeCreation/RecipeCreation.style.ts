import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";

/**
 * RecipeCreation styles.
 */

const styles = StyleSheet.create({
  recipeCreationLayout: {
    paddingHorizontal: aspectRatio("width", 5),
  },
  formBox: {
    flex: 75,
    width: "100%",
  },
  footer: {
    flex: 15,
    width: "100%",
    flexDirection: "row",
  },
  buttonBox: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: aspectRatio("width", 33),
  },
});

/* Exports */
export { styles };
