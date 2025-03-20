import { StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

/**
 * IngredientList
 */

const styles = StyleSheet.create({
  mashRest: {
    flex: 1,
    flexDirection: "row",
  },
  sideBox: {
    flex: 1,
  },
  restBox: {
    width: "40%",
  },
  addRestBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rest: {
    height: aspectRatio("height", 15),
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  restLabelBox: {
    flex: 1,
  },
  label: {
    color: theme.color.dark,
    fontWeight: "bold",
  },
  restContentBox: {
    flex: 1,
  },
  inputBox: {
    flex: 1,
  },
});

/* Exports */
export { styles };
