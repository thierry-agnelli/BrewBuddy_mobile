import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";

/**
 * RecipeRealisation styles.
 */

const styles = StyleSheet.create({
  recipeRealisationLayout: {
    flex: 1,
    width: "100%",
    paddingVertical: aspectRatio("height", 2.5),
  },
  realisationContent: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  realisationStep: {
    width: "100%",
    paddingVertical: aspectRatio("height", 5),
  },
  button: {
    width: aspectRatio("width", 50),
  },
});

/* Exports */
export { styles };
