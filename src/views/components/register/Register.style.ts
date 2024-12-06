import { Platform, StatusBar, StyleSheet } from "react-native";

import { theme } from "@theme";
import { aspectRatio } from "@utils";

/*  Register styles */

const styles = StyleSheet.create({
  layout: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: aspectRatio("width", 15),
    paddingBottom: aspectRatio("height", 2),
    justifyContent: "space-between",
  },
  title: {
    flex: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: {
    flex: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: theme.color.separator,
  },
  cgu: {
    alignItems: "center",
    marginVertical: aspectRatio("height", 0.5),
  },
  cguText: {
    fontSize: theme.font.size.information,
    fontWeight: "bold",
  },
  inputItem: {
    width: "100%",
  },
  login: {
    flex: 10,
    justifyContent: "center",
  },
  loginLink: {
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
  errorMessage: {
    fontWeight: "bold",
    fontSize: theme.font.size.information,
    color: theme.color.error,
  },
  successfulRegistrationLayout: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  successfulRegistration: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

/* Export */
export { styles };
