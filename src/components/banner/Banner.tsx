import { Image } from "react-native";
import { banner } from "@assets";

import { styles } from "./Banner.style";

/**
 * Register Component.
 */
const Banner = () => {
  return <Image source={banner} style={styles.layout} testID="banner-pic" />;
};

export { Banner };
