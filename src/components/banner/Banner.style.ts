import { StyleSheet } from "react-native";

import { aspectRatio } from "@utils";

/*  Banner styles */

const styles = StyleSheet.create({
  layout: {
    height: aspectRatio("height", 15),
    width: aspectRatio("width", 100),
  },
});

/* Export */
export { styles };
