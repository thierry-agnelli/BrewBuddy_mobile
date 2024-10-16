import { Text, View, Button } from "react-native";
import { DrawerScreenViewProps } from "@router";

import { styles } from "./Home.style";

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
    <View style={styles.layout}>
      <Text>Votre compagnon de brassage !!</Text>
      <Button title="About" onPress={onPressHandler} testID="navigate-button" />
    </View>
  );

  /* Handlers */

  /**
   * Button pressed handler.
   */
  function onPressHandler() {
    navigation.navigate("About");
  }
}

/* Exports */
export { Home };
