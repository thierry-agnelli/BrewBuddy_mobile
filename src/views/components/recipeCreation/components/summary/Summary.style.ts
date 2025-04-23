import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Summary component styles.
 */

const styles = StyleSheet.create({
  summary: {
    position: "absolute",
    height: "100%",
    width: aspectRatio("width", 100),
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: aspectRatio("width", 5),
    paddingVertical: aspectRatio("height", 5),
  },
  summaryError: {
    color: theme.color.error,
    fontWeight: "bold",
  },
  summaryCard: {
    height: "100%",
    width: "100%",
    borderWidth: theme.border.width,
    borderColor: theme.color.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: aspectRatio("width", 3.5),
    paddingVertical: aspectRatio("height", 2),
    backgroundColor: theme.color.background,
  },
  summaryEndedBox: {
    width: "100%",
    marginVertical: aspectRatio("height", 1),
    alignItems: "flex-start",
  },
  summaryCardFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  summaryScroll: {
    width: "100%",
    marginTop: aspectRatio("height", 2.5),
    paddingHorizontal: aspectRatio("width", 3.5),
    paddingBottom: aspectRatio("height", 5),
  },
  summaryNameType: {
    flexDirection: "row",
  },
  summaryStepTile: {
    fontWeight: "bold",
    fontSize: theme.font.size.cardTitle,
  },
  summaryStepSubTitle: {
    marginBottom: aspectRatio("height", 0.5),
  },
  cardItemTitle: {
    marginBottom: aspectRatio("height", 2),
  },
  summaryBoldText: {
    fontWeight: "bold",
  },
  summaryItalicText: {
    fontStyle: "italic",
  },
  description: {
    paddingVertical: aspectRatio("height", 1),
  },
  summaryCardButton: {
    width: aspectRatio("width", 25),
  },
  summaryErrorMessage: {
    height: aspectRatio("height", 5),
  },
});

/* Exports */
export { styles };
