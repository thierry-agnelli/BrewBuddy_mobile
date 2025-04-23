import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Reset password modal styles.
 */

const styles = StyleSheet.create({
  updateProfileModal: {
    width: aspectRatio("width", 90),
    height: aspectRatio("height", 30),
    borderWidth: theme.border.bold,
    borderColor: theme.color.primary,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: aspectRatio("width", 10),
    alignItems: "center",
    justifyContent: "space-around",
  },
  errorMessage: {
    color: theme.color.error,
  },
});

/* Exports */
export { styles };
