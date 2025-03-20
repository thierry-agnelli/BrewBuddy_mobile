import { Platform, StatusBar, StyleSheet } from "react-native";
import { theme } from "@theme";

/**
 *  DrawerContent styles
 */
const styles = StyleSheet.create({
  drawer: {
    display: "flex",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginRight: "5%",
    marginLeft: "5%",
    height: "100%",
  },
  header: {
    flex: 6,
    paddingBottom: "3%",
    paddingRight: "5%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: theme.color.primary,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  routes: {
    flex: 87,
    overflow: "scroll",
  },
  footer: {
    flex: 7,
    paddingRight: "5%",
    justifyContent: "center",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: theme.color.primary,
  },
  logoutIcon: {
    height: "50%",
    width: "10%",
    tintColor: theme.color.primary,
  },
});

/* Export */
export { styles };
