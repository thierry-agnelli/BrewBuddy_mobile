import { StyleSheet } from "react-native";

import { theme } from "@theme";
import { aspectRatio } from "@utils";

/* Button style */

const styles = StyleSheet.create({
  button: {
    height: aspectRatio("height", 4.5),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.border.radius,
    backgroundColor: theme.color.primary,
  },
  enabled: {
    // backgroundColor: theme.color.primary,
  },
  disabled: {
    backgroundColor: theme.color.disable,
  },
  title: {
    flex: 3,
    textAlign: "center",
    fontSize: aspectRatio("height", 2),
    fontWeight: "bold",
    color: theme.color.lightText,
  },
  iconBox: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    height: aspectRatio("height", 3),
    width: aspectRatio("height", 3),
    tintColor: theme.color.primary,
  },
});

/* Exports */
export { styles };
