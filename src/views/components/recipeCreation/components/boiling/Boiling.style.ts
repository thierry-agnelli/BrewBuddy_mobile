import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";

/**
 * Boiling styles.
 */

const styles = StyleSheet.create({
  boiling: {
    flexDirection: "row",
  },
  dragList: {
    flex: 8.75,
  },
  addStepBox: {
    flex: 1.25,
    paddingVertical: aspectRatio("height", 1),
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

/* Exports */
export { styles };
