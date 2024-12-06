import { Dimensions } from "react-native";

/**
 * Get percentage of screen dimension.
 */
function aspectRatio(dimension: "height" | "width", ratio: number) {
  const screenDimensions = Dimensions.get("window");
  return (
    screenDimensions[dimension as keyof typeof screenDimensions] * (ratio / 100)
  );
}

/* export */
export { aspectRatio };
