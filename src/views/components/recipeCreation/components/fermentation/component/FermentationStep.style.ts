import { StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

/**
 * IngredientList
 */

const styles = StyleSheet.create({
  fermentationStep: {
    height: aspectRatio("height", 12),
    width: "100%",
  },
  stepLabelBox: {
    flex: 1.5,
  },
  label: {
    color: theme.color.text,
    fontWeight: "bold",
  },
  stepContentBox: {
    flex: 3.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    width: aspectRatio("width", 30),
  },
});

/* Exports */
export { styles };
