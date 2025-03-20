import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Login styles.
 */

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: aspectRatio("width", 15),
  },
  title: {
    flex: 40,
    width: "100%",
    paddingBottom: aspectRatio("height", 1.5),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginForm: {
    flex: 40,
    width: "100%",
    justifyContent: "space-evenly",
    borderBottomWidth: theme.border.width,
    borderBottomColor: theme.color.separator,
  },
  loginFormInput: {
    flex: 8,
    justifyContent: "space-evenly",
  },
  loginFormButton: {
    flex: 2,
    justifyContent: "flex-end",
    marginBottom: aspectRatio("width", 2),
  },
  loginFormBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  option: {
    fontSize: theme.font.size.information,
  },
  errorMessage: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: theme.font.size.information,
    color: theme.color.error,
  },
  footer: {
    flex: 15,
    width: "100%",
    paddingTop: aspectRatio("height", 1.5),
    alignItems: "center",
  },
  registerNavigationBox: {
    flex: 3,
    justifyContent: "flex-start",
  },
  registerNavigation: {
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
});

/* Exports */
export { styles };
