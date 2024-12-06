import { useMemo } from "react";
import { Text as RNtext, StyleSheet, TextProps } from "react-native";
import { fontWeightMap } from "@helpers";
import { theme } from "@theme";

/**
 * Text Components.
 */

function Text(props: TextProps) {
  const { children, style, testID = "text-element", ...baseTextProps } = props;

  /* Default family font */
  const computedStyle = useMemo(() => {
    // Flat props style.
    const flattenedStyle = StyleSheet.flatten(style);

    // Extract fontWeight
    const { fontFamily, fontWeight, ...filteredStyle } = flattenedStyle || {};

    // Set font Family to Helvetica by default
    const font = fontFamily ? fontFamily : theme.font.family.text;

    // Set font with fontWeight
    const formattedFontFamily = `${font}-${fontWeightMap.get(fontWeight)}`;

    // Return flattened computed style.
    return StyleSheet.flatten([
      { fontFamily: formattedFontFamily, color: theme.color.text },
      filteredStyle,
    ]);
  }, [style]);

  return (
    <RNtext style={computedStyle} {...baseTextProps} testID={testID}>
      {children}
    </RNtext>
  );
}

/* Export */
export { Text };
