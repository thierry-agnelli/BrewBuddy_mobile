import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";

/**
 * RealisationStart styles.
 */
const styles = StyleSheet.create({
  mashing: {
    height: "100%",
    width: "100%",
  },
  temperaturesBox: {
    height: "25%",
    flexDirection: "row",
  },
  temperatureElement: {
    flex: 1,
    alignItems: "center",
  },
  value: {
    fontSize: aspectRatio("height", 7),
  },
  outOfBounds: {
    color: "red",
  },
  withinBounds: {
    color: "green",
  },
  duration: {
    width: "100%",
    alignItems: "center",
  },
});

/* Exports */
export { styles };
