import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";

/**
 * RealisationStart styles.
 */
const styles = StyleSheet.create({
  crushing: {
    height: "100%",
    width: "100%",
  },
  maltsList: {
    width: "100%",
    alignItems: "center",
    paddingVertical: aspectRatio("height", 5),
  },
});

/* Exports */
export { styles };
