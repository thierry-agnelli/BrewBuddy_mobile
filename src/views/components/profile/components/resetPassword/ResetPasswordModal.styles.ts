import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Reset password modal styles.
 */

const styles = StyleSheet.create({
  resetPasswordModal: {
    width: aspectRatio("width", 90),
    height: aspectRatio("height", 30),
    borderWidth: theme.border.bold,
    borderColor: theme.color.primary,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

/* Exports */
export { styles };
