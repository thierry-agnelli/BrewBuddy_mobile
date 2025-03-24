import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Recipe view styles.
 */

const styles = StyleSheet.create({
  recipe: {
    paddingVertical: aspectRatio("height", 3),
    justifyContent: "space-between",
    width: "100%",
  },
  recipeName: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  recipeContent: {
    flex: 8,
    width: "100%",
  },
  sectionTitle: {
    paddingVertical: aspectRatio("height", 0.3),
    fontSize: theme.font.size.cardTitle,
    fontWeight: "bold",
  },
  sectionItem: {
    paddingVertical: aspectRatio("height", 0.5),
  },
  recipeCard: {
    borderColor: theme.color.primary,
  },
  returnToList: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  italicText: {
    fontStyle: "italic",
  },
});

/* Exports */
export { styles };
