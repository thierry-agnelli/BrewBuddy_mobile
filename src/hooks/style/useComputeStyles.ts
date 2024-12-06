import { useMemo } from "react";

/**
 * Compute style.
 */

function useComputeStyles<S>(baseStyles: S, styles?: S | S[]): S {
  return useMemo(() => {
    // Get base Style.
    const mergedStyles: S = { ...baseStyles };

    if (!styles) return mergedStyles;

    // if custom style, override base style.
    for (const style of Array.isArray(styles) ? styles : [styles]) {
      for (const property in mergedStyles) {
        mergedStyles[property] = {
          ...mergedStyles[property],
          ...style[property],
        };
      }
    }

    return mergedStyles;
  }, [baseStyles, styles]);
}

/* Exports */
export { useComputeStyles };
