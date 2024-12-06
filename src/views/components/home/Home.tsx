import { View, Button } from "react-native";
import { DrawerScreenViewProps, Routes } from "@models";
import { Text } from "@components";
import { premadeClasses } from "@helpers";

/**
 * Home View.
 *
 * @param {DrawerScreenViewProps} props : View props.
 *
 * @returns {JSX.Element} : The component.
 */
function Home(props: DrawerScreenViewProps) {
  const { navigation } = props;

  /* Render */
  return (
    <View style={premadeClasses.layout}>
      <Text>Votre compagnon de brassage !!</Text>
      <Button title="About" onPress={onPressHandler} testID="navigate-button" />
    </View>
  );

  /* Handlers */

  /**
   * Button pressed handler.
   */
  function onPressHandler() {
    navigation.navigate(Routes.ABOUT);
  }
}

/* Exports */
export { Home };
