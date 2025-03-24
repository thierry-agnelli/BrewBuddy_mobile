import { useState } from "react";
import { ScrollView, View } from "react-native";

import { premadeClasses } from "@helpers";
import { getAllRecipes } from "@services";
import { Banner, Button } from "@components";
import {
  DrawerScreenViewProps,
  RecipeModelResponse,
  Routes,
  UserRoles,
} from "@models";
import { useAuthentication } from "@hooks";

import { RecipeCard } from "./components/RecipeCard";

import { styles } from "./Recipes.style";

/**
 * Recipes View
 */
function Recipes({ navigation }: DrawerScreenViewProps<Routes.RECIPES>) {
  const [recipes, setRecipes] = useState<RecipeModelResponse[]>();

  const { role } = useAuthentication();

  // Get Recipes
  (async () => {
    const res = await getAllRecipes();
    setRecipes(res);
  })();

  const { layout } = premadeClasses;

  return (
    <View style={[layout, styles.recipes]} testID={"recipes"}>
      <Banner />
      {role >= UserRoles.ADMIN && (
        <View style={styles.recipeCreation}>
          <Button
            title={"Créer ma recette"}
            onPress={createRecipeButtonPress}
            testID={"create-recipe"}
          />
        </View>
      )}
      <View style={styles.recipesList}>
        <ScrollView>
          {recipes?.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              navigate={navigation.navigate}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  /* Events */
  /**
   * Navigate to recipe creation.
   */
  function createRecipeButtonPress() {
    navigation.navigate(Routes.RECIPE_CREATION, {});
  }
}

/* Exports */
export { Recipes };
