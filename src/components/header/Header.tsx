import { View } from "react-native";
import { styles } from "./Header.style";
import { Text } from "../text/Text";

/**
 * Header component.
 *
 * @returns {JSX.?Element} : The Header.
 */
function Header() {
  /* Render */
  return (
    <View>
      <Text style={styles.logo}>Logo</Text>
    </View>
  );
}

/* Export */
export { Header };
