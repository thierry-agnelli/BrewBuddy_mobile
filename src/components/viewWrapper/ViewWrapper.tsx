import { SafeAreaView, StatusBar } from "react-native";
import type { PropsWithChildren } from "react";
import { theme } from "@theme";
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
      <StatusBar
        translucent
        backgroundColor={theme.color.primary}
        barStyle="dark-content"
      />
      {children}
    </SafeAreaView>
  );
}

/* Exports */
export { ViewWrapper };
