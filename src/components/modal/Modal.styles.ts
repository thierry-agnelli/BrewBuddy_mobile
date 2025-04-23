import { StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

/**
 * Reset password modal styles.
 */

const styles = StyleSheet.create({
  modal: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000090",
  },
  closeIconBox: {
    width: "100%",
    paddingHorizontal: aspectRatio("width", 6),
    alignItems: "flex-end",
  },
  closeIcon: {
    tintColor: theme.color.secondary,
    height: aspectRatio("height", 2),
    width: aspectRatio("height", 2),
  },
});

/* Exports */
export { styles };
