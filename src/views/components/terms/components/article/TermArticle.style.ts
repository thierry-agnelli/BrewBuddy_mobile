import { StyleSheet } from "react-native";
import { aspectRatio } from "@utils";

/**
 * Article styles.
 */

const styles = StyleSheet.create({
  article: {
    marginBottom: aspectRatio("height", 1.5),
  },
  articleTitle: {
    marginBottom: aspectRatio("height", 0.25),
    fontWeight: "bold",
  },
});

/* Exports */
export { styles };
