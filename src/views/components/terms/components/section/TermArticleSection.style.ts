import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";

/**
 * Article section styles.
 */

const styles = StyleSheet.create({
  articleSection: {
    marginVertical: aspectRatio("height", 0.25),
  },
  articleSubTitle: {
    marginVertical: aspectRatio("height", 0.5),
  },
});

/* Exports */
export { styles };
