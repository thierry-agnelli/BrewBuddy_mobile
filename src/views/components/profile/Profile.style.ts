import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Login styles.
 */

const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: aspectRatio("width", 7.5),
  },
  profileHeader: {
    flex: 2.5,
    width: "100%",
    flexDirection: "row",
  },
  profileIconBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    width: aspectRatio("width", 35),
    height: aspectRatio("width", 35),
    tintColor: theme.color.darkGrey,
  },
  profileHeaderInfo: {
    flex: 1,
    paddingTop: "5%",
    paddingBottom: "25%",
    paddingLeft: "5%",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  role: {
    fontSize: theme.font.size.cardTitle,
    fontWeight: "bold",
    color: theme.color.primary,
  },
  profileContent: {
    flex: 6.5,
    width: "100%",
  },
  contentElement: {
    height: aspectRatio("height", 22.5),
    paddingVertical: aspectRatio("height", 2.5),
    paddingHorizontal: aspectRatio("width", 2.5),
  },
  elementTitle: {
    marginBottom: aspectRatio("height", 2),
    fontSize: theme.font.size.cardTitle,
    fontWeight: "bold",
  },
  updateProfile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  deleteProfile: {
    flex: 1,
    paddingVertical: aspectRatio("height", 2.5),
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {
    width: aspectRatio("width", 35),
    height: aspectRatio("height", 6.5),
    borderWidth: theme.border.bold,
    borderColor: theme.color.primary,
    backgroundColor: "transparent",
  },
  profileButtonTitle: {
    color: theme.color.primary,
  },
  deleteButton: {
    width: aspectRatio("width", 35),
    height: aspectRatio("height", 6.5),
    borderWidth: theme.border.bold,
    borderColor: theme.color.error,
    backgroundColor: "transparent",
  },
  deleteButtonTitle: {
    color: theme.color.error,
  },
  recipeElement: {
    paddingVertical: aspectRatio("height", 2.5),
    paddingHorizontal: aspectRatio("width", 2.5),
  },
  recipeLinkBox: {
    height: aspectRatio("height", 3.5),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  recipeLinkIcon: {
    width: aspectRatio("width", 7),
    height: aspectRatio("height", 1.5),
    marginHorizontal: aspectRatio("width", 5),
    tintColor: theme.color.primary,
  },
  recipeBookmarkIcon: {
    width: aspectRatio("width", 5),
    height: aspectRatio("height", 2.5),
    marginHorizontal: aspectRatio("width", 5),
    tintColor: theme.color.primary,
  },
  profileFooter: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  homeButtonBox: {
    width: aspectRatio("width", 30),
    height: aspectRatio("height", 3.5),
  },
  separator: {
    width: "100%",
    borderWidth: theme.border.width,
    borderColor: theme.color.primary,
  },
});

/* Exports */
export { styles };
