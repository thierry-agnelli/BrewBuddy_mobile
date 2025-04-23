import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";

/**
 * RealisationStart styles.
 */
const styles = StyleSheet.create({
  realisationStart: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  description: {
    alignItems: "center",
  },
  specs: {
    flexDirection: "row",
    gap: aspectRatio("width", 5),
  },
  startConfirmation: {
    height: "20%",
    justifyContent: "center",
    gap: aspectRatio("height", 2),
  },
  buttons: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    gap: aspectRatio("width", 10),
  },
  button: {
    width: aspectRatio("width", 30),
  },
});

/* Exports */
export { styles };
