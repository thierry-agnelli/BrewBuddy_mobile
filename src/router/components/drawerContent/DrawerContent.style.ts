import { Platform, StatusBar, StyleSheet } from "react-native";
import { theme } from "@theme";
import { aspectRatio } from "@utils";

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
    flex: 0.5,
    // paddingBottom: "3%",
    paddingRight: "5%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  profileBox: {
    height: aspectRatio("height", 5),
    paddingLeft: aspectRatio("width", 3),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.color.primary,
  },
  profileIconBox: {
    height: "100%",
    width: aspectRatio("height", 5),
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    height: "80%",
    width: "80%",
    tintColor: theme.color.informative,
  },
  profileNameBox: {
    flex: 1,
    paddingLeft: aspectRatio("width", 2.5),
  },
  routes: {
    flex: 8.25,
    overflow: "scroll",
  },
  footer: {
    flex: 0.75,
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
