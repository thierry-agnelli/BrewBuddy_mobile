import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";
import { theme } from "@theme";

/**
 * Login styles.
 */

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: aspectRatio("height", 5),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  labelContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: aspectRatio("width", 50),
  },
  text: {
    fontSize: theme.font.size.information,
  },
  limitLabel: {
    color: theme.color.informative,
  },
  sliderBox: {
    flex: 1,
    width: "100%",
    padding: 0,
  },
});

/* Exports */
export { styles };
