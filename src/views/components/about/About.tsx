import { Button, Text, View } from "react-native";
import { styles } from "./About.style";
import { DrawerScreenViewProps } from "@router";

/**
 * About View.
 *
 * @param {DrawerScreenViewProps} props : View props.
 *
 * @returns {JSX.Element} : The component.
 */
function About(props: DrawerScreenViewProps) {
  const { navigation } = props;

  /* Render */
  return (
    <View style={styles.layout}>
      <Text>A propos.</Text>
      <Button title="Back" onPress={onPressHandler} testID="back-button" />
    </View>
  );

  /* Handlers */

  /**
   * Button pressed handler.
   */
  function onPressHandler() {
    navigation.goBack();
  }
}

/* Exports */
export { About };
