import { StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

/**
 * Input Styles
 */

const styles = StyleSheet.create({
  input: {
    height: aspectRatio("height", 3.5),
    width: "100%",
  },
  disabled: {
    backgroundColor: theme.color.disable,
  },
  labelBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  label: {
    fontWeight: "bold",
  },
  fieldBox: {
    flex: 7.5,
  },
  field: {
    height: "100%",
    paddingHorizontal: aspectRatio("width", 3),
    paddingVertical: 0,
    color: theme.color.text,
    borderWidth: theme.border.width,
    borderRadius: theme.border.radius,
    borderColor: theme.color.primary,
    backgroundColor: theme.color.backgroundSecondary,
  },
  fieldError: {},
  requiredError: {},
});

/* Export */
export { styles };
