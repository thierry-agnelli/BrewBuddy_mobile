import { Button, View } from "react-native";
import { DrawerScreenViewProps } from "@models";
import { Text } from "@components";
import { premadeClasses } from "@helpers";

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
    <View style={premadeClasses.layout}>
      <Text>A propos.</Text>
      <Button title="Back" onPress={onPressHandler} testID="back-button" />
    </View>
  );

  /* Handlers */

  /**
   * Button pressed handler.
   */
  async function onPressHandler() {
    navigation.goBack();
  }
}

/* Exports */
export { About };
