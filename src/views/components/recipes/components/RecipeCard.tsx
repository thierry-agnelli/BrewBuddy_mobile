import { TouchableOpacity, View } from "react-native";

import { premadeClasses } from "@helpers";
import { Text } from "@components";
import { RecipeModelResponse, RouteParameter, Routes } from "@models";
import { shortenText } from "@utils";

import { styles } from "./RecipeCard.style";
import { useMemo } from "react";

/**
 * Recipe card props.
 */
type RecipeCardProps = {
  recipe: RecipeModelResponse;
  navigate: (routeName: Routes, params: RouteParameter[Routes.RECIPES]) => void;
};

/**
 * Recipe cards component.
 */
function RecipeCard({ recipe, navigate }: RecipeCardProps) {
  const description = useMemo(() => {
    return shortenText(recipe.profil.description, 90);
  }, [recipe]);

  const { viewContent } = premadeClasses;

  return (
    <TouchableOpacity
      style={[viewContent.formCard, styles.recipeCard]}
      onPress={onRecipePressHandler}
      testID={"recipe-card"}
    >
      <View style={styles.recipeName}>
        <Text style={styles.name} testID={"recipe-name"}>
          {recipe.profil.recipeName}
        </Text>
      </View>
      <View style={styles.recipeSummary}>
        <Text>{recipe.profil.style}</Text>
        <Text>amertume: {recipe.profil.ibu}</Text>
        <Text>ebc: {recipe.profil.ebc}</Text>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  /* Events */
  /**
   * Open Recipe page.
   */
  function onRecipePressHandler() {
    navigate(Routes.RECIPE, {
      recipe,
    });
  }
}

/* Exports */
export { RecipeCard };
