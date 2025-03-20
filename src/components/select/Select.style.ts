import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

const MAX_DROPDOWN_HEIGHT = aspectRatio("height", 20);

/**
 * Select styles.
 */

const styles = StyleSheet.create({
  select: {
    justifyContent: "center",
    width: "100%",
  },
  inputSelect: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: aspectRatio("width", 2),
    backgroundColor: theme.color.backgroundSecondary,
    borderWidth: theme.border.width,
    borderRadius: theme.border.radius,
    borderColor: theme.color.primary,
  },
  label: {
    fontWeight: "bold",
    marginBottom: aspectRatio("height", 0.5),
  },
  placeholder: {
    color: theme.color.informative,
  },
  selectedItem: {
    color: theme.color.text,
  },
  dropDown: {
    height: "auto",
    maxHeight: MAX_DROPDOWN_HEIGHT,
    position: "absolute",
    borderWidth: theme.border.width,
    borderRadius: theme.border.radius,
    borderColor: theme.color.informative,
    backgroundColor: theme.color.backgroundSecondary,
  },
  dropDownItem: {
    height: "auto",
    justifyContent: "center",
    paddingVertical: aspectRatio("height", 0.5),
    paddingHorizontal: aspectRatio("width", 2),
    borderBottomWidth: theme.border.width,
    borderColor: theme.color.primary,
  },
  backdrop: {
    flex: 1,
  },
});

/* Exports */
export { styles, MAX_DROPDOWN_HEIGHT };
