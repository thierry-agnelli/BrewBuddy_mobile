import { StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

/**
 * Recipe card styles.
 */
const styles = StyleSheet.create({
  recipeCard: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: aspectRatio("height", 22.5),
    marginVertical: aspectRatio("height", 1.5),
    borderWidth: theme.border.width,
    borderColor: theme.color.primary,
  },
  recipeName: {
    flex: 1,
    borderTopLeftRadius: theme.border.radius,
    borderTopRightRadius: theme.border.radius,
    paddingHorizontal: aspectRatio("width", 1.5),
    justifyContent: "center",
    backgroundColor: theme.color.primary,
  },
  name: {
    color: theme.color.lightText,
    fontWeight: "bold",
  },
  recipeSummary: {
    flex: 4,
    paddingHorizontal: aspectRatio("width", 3),
    justifyContent: "space-evenly",
  },
});

/* Exports */
export { styles };
