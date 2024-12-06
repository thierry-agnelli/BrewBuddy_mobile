import { StyleSheet } from "react-native";

/**
 * Style props.
 */
type StyleProps<S> = Partial<Record<keyof S, StyleSheet.NamedStyles<unknown>>>;

/* Exports */
export type { StyleProps };
