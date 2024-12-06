import { aspectRatio } from "@utils";

/* Theme */

const theme = {
  color: {
    primary: "#F2A501",
    secondary: "#E5E5E5",
    background: "#FEF7E8",
    backgroundSecondary: "#FFFFFF",
    disable: "#CCCCCC",
    text: "#333333",
    lightText: "#F8F8F8",
    error: "#E74C3C",
    separator: "#CCCCCC",
    link: "#1A73E8",
  },
  font: {
    size: {
      title: aspectRatio("height", 4),
      information: aspectRatio("height", 1.5),
    },
    family: {
      title: "Roboto",
      text: "Roboto",
    },
  },
  border: {
    width: 1,
    radius: 8,
  },
};

/* Exports */
export { theme };
