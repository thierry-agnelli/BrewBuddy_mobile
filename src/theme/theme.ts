import { aspectRatio } from "@utils";

/* Theme */

const theme = {
  color: {
    primary: "#F2A501",
    secondary: "#E5E5E5",
    dark: "#000000",
    darkGrey: "#888888",
    background: "#FEF7E8",
    backgroundSecondary: "#FFFFFF",
    disable: "#CCCCCC",
    text: "#333333",
    lightText: "#F8F8F8",
    informative: "#B0B0B0",
    error: "#E74C3C",
    alert: "#E74C3C",
    backgroundError: "#FFF2F6",
    separator: "#CCCCCC",
    link: "#1A73E8",
  },
  font: {
    size: {
      title: aspectRatio("height", 4),
      subTitle: aspectRatio("height", 3),
      cardTitle: aspectRatio("height", 2),
      information: aspectRatio("height", 1.5),
      mediumLight: aspectRatio("height", 1.25),
      light: aspectRatio("height", 1),
    },
    family: {
      title: "Roboto",
      text: "Roboto",
    },
  },
  border: {
    width: 1,
    bold: 2,
    radius: 8,
    radiusLight: 4,
  },
};

/* Exports */
export { theme };
