import { View } from "react-native";
import { Text } from "../text/Text";
import { premadeClasses } from "@helpers";

import { styles } from "./Header.style";

/**
 * Header component.
 *
 * @returns {JSX.?Element} : The Header.
 */
function Header() {
  const { viewContent } = premadeClasses;

  /* Render */
  return (
    <View>
      <Text style={[viewContent.title, styles.title]}>BrewBuddy</Text>
    </View>
  );
}

/* Export */
export { Header };
