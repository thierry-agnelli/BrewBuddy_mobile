import { aspectRatio } from "@utils";
import { StyleSheet } from "react-native";
import { theme } from "@theme";
/* CheckBox styles */

const styles = StyleSheet.create({
  checkbox: {
    height: "auto",
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  box: {
    height: aspectRatio("width", 4),
    width: aspectRatio("width", 4),
    borderWidth: theme.border.width,
    borderColor: theme.color.secondary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.backgroundSecondary,
  },
  checkIcon: {
    height: aspectRatio("width", 6),
    width: aspectRatio("width", 6),
    tintColor: theme.color.primary,
  },
  label: {
    paddingLeft: aspectRatio("width", 2),
  },
  fieldError: {},
  requiredError: {},
});

/* Exports */
export { styles };
