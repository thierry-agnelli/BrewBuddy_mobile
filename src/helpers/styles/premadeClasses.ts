import { StyleSheet } from "react-native";

import { aspectRatio } from "@utils";
import { theme } from "@theme";

/* Premade classes helper */

// Style classes définition
const layout = StyleSheet.create({
  class: {
    height: "100%",
    width: "100%",
    paddingHorizontal: aspectRatio("width", 4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.background,
  },
});

const banner = StyleSheet.create({
  class: {
    height: aspectRatio("height", 15),
    width: aspectRatio("width", 100),
    position: "absolute",
    top: 0,
  },
});

const viewTitle = StyleSheet.create({
  class: {
    fontFamily: theme.font.family.title,
    fontSize: theme.font.size.title,
    fontWeight: 500,
  },
});

// Errors
const fieldError = StyleSheet.create({
  class: {
    borderColor: theme.color.error,
  },
});

const requiredError = StyleSheet.create({
  class: {
    color: theme.color.error,
  },
});

// Premade
const premadeClasses = {
  layout: layout.class,
  banner: banner.class,
  viewTitle: viewTitle.class,
  fieldError: fieldError.class,
  requiredError: requiredError.class,
};

/* Exports */
export { premadeClasses };
