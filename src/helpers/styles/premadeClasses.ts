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

const viewContent = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleBox: {
    flex: 15,
    justifyContent: "center",
  },
  title: {
    fontFamily: theme.font.family.title,
    fontSize: theme.font.size.subTitle,
    fontWeight: "900",
  },
  pictureBox: {
    flex: 20,
    width: aspectRatio("width", 75),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
  },
  picture: {
    height: aspectRatio("height", 16),
    width: aspectRatio("width", 80),
  },
  textBox: {
    flex: 50,
    justifyContent: "flex-start",
    paddingTop: aspectRatio("height", 5),
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  bottomPageButtonBox: {
    flex: 15,
    justifyContent: "flex-start",
  },
  bottomPageButton: {
    width: aspectRatio("width", 40),
    fontSize: theme.font.size.light,
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
  viewTitle: viewTitle.class,
  fieldError: fieldError.class,
  requiredError: requiredError.class,
  viewContent,
};

/* Exports */
export { premadeClasses };
