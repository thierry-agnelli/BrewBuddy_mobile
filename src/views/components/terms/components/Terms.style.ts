import { StyleSheet } from "react-native";
import { theme } from "@theme";

/**
 * Terms styles.
 */

const styles = StyleSheet.create({
  layout: {
    alignItems: "flex-start",
  },
  goBackBox: {
    width: "100%",
    alignItems: "flex-end",
  },
  goBack: {
    color: theme.color.informative,
  },
  scroll: {
    flex: 85,
    alignItems: "flex-start",
    width: "100%",
  },
});

/* Exports */
export { styles };
