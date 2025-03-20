import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";

/**
 * BeerProfile styles.
 */

const styles = StyleSheet.create({
  beerProfile: {
    height: aspectRatio("height", 40),
  },
  topElementGroup: {
    flex: 1,
    flexDirection: "row",
  },
  bottomElementGroup: {
    flex: 1,
  },
  elementGroup: {
    flex: 1,
    alignItems: "center",
  },
  element: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  beerNameInput: {
    width: aspectRatio("width", 35),
  },
  select: {
    width: aspectRatio("width", 35),
    height: aspectRatio("height", 3.5),
  },
  dropDown: {
    width: aspectRatio("width", 35),
  },
  descriptionInput: {
    width: "100%",
    height: aspectRatio("height", 15),
  },
  descriptionInputField: {
    textAlignVertical: "top",
    paddingVertical: aspectRatio("height", 0.75),
  },
});

/* Exports */
export { styles };
