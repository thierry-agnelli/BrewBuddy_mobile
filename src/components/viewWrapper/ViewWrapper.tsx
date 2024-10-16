import { SafeAreaView, StatusBar, View } from "react-native";
import type { PropsWithChildren } from "react";
import { styles } from "./ViewWrapper.style";

/**
 * Wrap view in commons base elements.
 *
 * @param {PropsWithChildren} props : Vierw Props.
 *
 * @returns {JSX.Element} : THe component.
 */
function ViewWrapper(props: PropsWithChildren) {
  const { children } = props;

  /* Render */
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.ViewContainer}>{children}</View>
    </SafeAreaView>
  );
}

/* Exports */
export { ViewWrapper };
