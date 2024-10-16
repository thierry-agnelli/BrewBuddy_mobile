import { Text, View } from "react-native";
import { styles } from "./Header.style";

/**
 * Header component.
 *
 * @returns {JSX.?Element} : The Header.
 */
function Header() {
  /* Render */
  return (
    <View style={styles.test}>
      <Text style={styles.logo}>Logo</Text>
    </View>
  );
}

/* Export */
export { Header };
