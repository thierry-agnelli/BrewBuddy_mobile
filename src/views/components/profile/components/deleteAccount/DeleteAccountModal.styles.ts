import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Reset password modal styles.
 */

const styles = StyleSheet.create({
  deleteAccountModal: {
    width: aspectRatio("width", 90),
    height: aspectRatio("height", 30),
    alignItems: "center",
    borderWidth: theme.border.bold,
    borderColor: theme.color.alert,
  },
  modalTitle: {
    color: theme.color.alert,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalMessage: {
    alignItems: "center",
  },
  modalText: {
    fontWeight: "bold",
  },
  errorMessage: {
    color: theme.color.error,
  },
  modalButtonButtonsBox: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    width: aspectRatio("width", 30),
    fontSize: theme.font.size.light,
  },
  modalDeleteButton: {
    backgroundColor: theme.color.alert,
  },
});

/* Exports */
export { styles };
