import { StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

/**
 * Input Styles
 */

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: aspectRatio("height", 0.5),
  },
  labelBox: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
    marginBottom: aspectRatio("height", 0.5),
  },
  field: {
    height: aspectRatio("height", 5),
    width: "100%",
    paddingHorizontal: aspectRatio("width", 3),
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
