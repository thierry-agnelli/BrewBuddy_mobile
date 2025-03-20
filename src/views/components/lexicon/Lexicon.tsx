import { Image, View } from "react-native";
import { DrawerScreenViewProps } from "@models";
import { Banner, Button, Text } from "@components";
import { premadeClasses } from "@helpers";
import { lexicon } from "@assets";

/**
 * Lexical View.
 *
 * @param {DrawerScreenViewProps} props : View props.
 *
 * @returns {JSX.Element} : The component.
 */
function Lexicon(props: DrawerScreenViewProps) {
  const { navigation } = props;
  const { viewContent, layout } = premadeClasses;

  /* Render */
  return (
    <View style={layout} testID="lexicon-view">
      <Banner />
      <View style={viewContent.layout}>
        <View style={viewContent.titleBox}>
          <Text style={viewContent.title}>Le petit lexique du brasseur.</Text>
        </View>
        <View style={viewContent.pictureBox}>
          <Image source={lexicon} style={viewContent.picture} />
        </View>
        <View style={viewContent.textBox}>
          <Text style={viewContent.text}>
            Naviguez dans le monde complexe du brassage avec notre Lexique du
            Brasseur.
          </Text>
          <Text style={viewContent.text}>
            Cet article est conçu pour éclaircir les termes techniques souvent
            rencontrés dans les recettes et les discussions autour de la
            brasserie. Que vous soyez novice ou expérimenté.
          </Text>
        </View>
        <View style={viewContent.bottomPageButtonBox}>
          <Button
            title="Retour"
            onPress={onPressHandler}
            testID="back-button"
            style={{ button: viewContent.bottomPageButton }}
          />
        </View>
      </View>
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
export { Lexicon };
