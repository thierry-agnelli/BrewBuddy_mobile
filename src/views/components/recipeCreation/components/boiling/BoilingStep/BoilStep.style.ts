import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * BoilingElement styles.
 */
const styles = StyleSheet.create({
  boilingStep: {
    height: aspectRatio("height", 6),
    flexDirection: "row",
    paddingVertical: 0,
    paddingHorizontal: aspectRatio("width", 2),
    justifyContent: "space-between",
    alignItems: "center",
  },
  active: {
    borderColor: theme.color.primary,
    borderWidth: theme.border.bold,
  },
  dragIcon: {
    height: aspectRatio("width", 5),
    width: aspectRatio("width", 2.5),
    tintColor: theme.color.primary,
  },
  select: {
    width: aspectRatio("width", 32.5),
    height: aspectRatio("height", 3.5),
  },
  boilingInput: {
    width: aspectRatio("width", 16),
  },
  addingTimeError: {
    borderWidth: theme.border.width,
    borderColor: theme.color.error,
    backgroundColor: theme.color.backgroundError,
  },
});

/* Exports */
export { styles };
