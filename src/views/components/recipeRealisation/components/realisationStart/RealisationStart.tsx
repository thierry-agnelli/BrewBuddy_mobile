import { View } from "react-native";

import { Text, Button } from "@components";
import { premadeClasses } from "@helpers";
import { Routes } from "@models";

import { useRealisationContext } from "../../hooks/useRealisationContext.ts";

import { styles } from "./RealisationStart.style";

/**
 * Realisation Start component.
 */
function RealisationStart() {
  const { recipe, navigation, nextStep } = useRealisationContext();

  const { layout, viewContent } = premadeClasses;

  return (
    <View
      style={[layout, styles.realisationStart]}
      testID={"realisation-start"}
    >
      <View style={styles.description}>
        <Text style={viewContent.title}>{recipe?.profil.recipeName}</Text>
        <Text style={viewContent.text}>{recipe?.profil.style}</Text>
        <View style={styles.specs}>
          <Text>ibu: {recipe?.profil.ibu}</Text>
          <Text>ebc: {recipe?.profil.ebc}</Text>
        </View>
      </View>
      <View style={styles.startConfirmation}>
        <Text style={viewContent.text}>Démarrer la recette ?</Text>
        <View style={styles.buttons}>
          <Button
            style={styles}
            title={"Retour"}
            onPress={onReturnPressHandler}
          />
          <Button
            style={styles}
            title={"Commencer"}
            testID={"start-button"}
            onPress={onStartRecipePress}
          />
        </View>
      </View>
    </View>
  );

  /* Events */
  /**
   * On return press handler.
   */
  function onReturnPressHandler() {
    navigation.navigate(Routes.RECIPES, {});
  }

  /**
   * On start recipe press handler.
   */
  async function onStartRecipePress() {
    nextStep();
  }
}

/* Exports */
export { RealisationStart };
