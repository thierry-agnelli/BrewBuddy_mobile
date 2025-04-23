import { View, TouchableOpacity } from "react-native";

import { premadeClasses } from "@helpers";
import { DrawerScreenViewProps, Routes } from "@models";

import { Text } from "../text/Text";

import { styles } from "./Header.style";

/**
 * Header component.
 *
 * @returns {JSX.?Element} : The Header.
 */
function Header(props: Omit<DrawerScreenViewProps<Routes>, "route">) {
  const { navigation } = props;
  const { viewContent } = premadeClasses;

  /* Render */
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.HOME, {})}
        testID={"header-home-button"}
      >
        <Text style={[viewContent.title, styles.title]}>BrewBuddy</Text>
      </TouchableOpacity>
    </View>
  );
}

/* Export */
export { Header };
