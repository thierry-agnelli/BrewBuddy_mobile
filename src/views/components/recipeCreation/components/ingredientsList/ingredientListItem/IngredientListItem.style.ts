import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * IngredientListItem styles.
 */

const styles = StyleSheet.create({
  ingredientListItem: {
    flexDirection: "row",
  },
  leftBox: {
    flex: 9,
  },
  rightBox: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: aspectRatio("width", 1.5),
  },
  ingredientLabel: {
    color: theme.color.text,
    fontWeight: "bold",
  },
  ingredientForm: {
    flex: 1,
    justifyContent: "center",
  },
  IngredientFormItem: {
    flex: 1,
    paddingVertical: aspectRatio("width", 1.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectBox: {
    height: "100%",
    justifyContent: "center",
  },
  select: {
    width: aspectRatio("width", 35),
  },
  inputSelect: {
    height: aspectRatio("height", 3),
    paddingVertical: aspectRatio("height", 0.25),
  },
  qtyBox: {
    flexDirection: "row",
    width: aspectRatio("width", 25),
    alignItems: "center",
  },
  resugaringBox: {
    justifyContent: "center",
  },
  resugaring: {
    borderColor: theme.color.primary,
  },
  dropDown: {
    width: aspectRatio("width", 35),
  },
  qty: {
    flex: 7,
    height: aspectRatio("height", 3),
  },
  dosage: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  measureUnit: {
    flex: 3,
    paddingLeft: aspectRatio("width", 1),
  },
});

/* Exports */
export { styles };
