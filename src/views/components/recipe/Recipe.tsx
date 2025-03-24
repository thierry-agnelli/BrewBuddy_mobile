import { useEffect, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";

import { Button, Text } from "@components";
import { premadeClasses } from "@helpers";
import {
  DrawerScreenViewProps,
  IngredientModel,
  IngredientsCategory,
  RecipeModelResponse,
  Routes,
} from "@models";

import { styles } from "./Recipe.style";
import { firstCharUpperCase } from "@utils";
import { getRecipe } from "@services";

type RecipeIngredients = Record<
  IngredientsCategory,
  IngredientModel["ingredients"]
>;

/**
 * Recipe View.
 */
function Recipe({ navigation, route }: DrawerScreenViewProps<Routes.RECIPE>) {
  const [internalRecipe, setInternalRecipe] = useState<RecipeModelResponse>();

  const { recipe } = route.params;
  useEffect(() => {
    if (typeof recipe !== "string") {
      setInternalRecipe(recipe);
    } else {
      (async () => {
        const res = await getRecipe(recipe);
        setInternalRecipe(res);
      })();
    }
  }, [recipe]);

  const recipeIngredients = useMemo<RecipeIngredients | undefined>(() => {
    return internalRecipe?.recipeIngredients.reduce(
      (acc: RecipeIngredients, curr) => {
        acc[curr.category] = curr.ingredients;
        return acc;
      },
      {} as RecipeIngredients,
    );
  }, [internalRecipe]);

  const { layout, viewContent } = premadeClasses;

  return (
    <View style={[layout, styles.recipe]} testID={"recipe"}>
      <View style={styles.recipeName}>
        <Text style={viewContent.title} testID={"recipe-name"}>
          {internalRecipe?.profil.name || "<NOM>"}
        </Text>
      </View>
      <View style={styles.recipeContent}>
        <ScrollView>
          <Text style={styles.sectionItem}>{internalRecipe?.profil.style}</Text>
          <Text style={styles.sectionItem}>
            ebc: {internalRecipe?.profil.ebc} ibu: {internalRecipe?.profil.ibu}
          </Text>
          <Text style={[styles.sectionItem, styles.italicText]}>
            {internalRecipe?.profil.description}
          </Text>
          <View style={[viewContent.formCard, styles.recipeCard]}>
            <Text style={styles.sectionTitle}>Ingrédients</Text>
            {Object.values(IngredientsCategory).map((category) => (
              <View key={category} testID={"category"}>
                <Text style={[styles.sectionItem, styles.italicText]}>
                  {firstCharUpperCase(category)}
                </Text>
                {recipeIngredients?.[category]?.map((ingredient, index) => (
                  <Text
                    key={ingredient.ingredientID + "-" + index}
                    testID={`ingredient-${category}-details`}
                  >
                    {ingredient.name || "<NOM>"}
                    {ingredient.quantity ? " " + ingredient.quantity : null}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <View style={[viewContent.formCard, styles.recipeCard]}>
            <Text style={styles.sectionTitle}>Empâtage</Text>
            {internalRecipe?.steps.mashing.steps.map((step, index) => (
              <View key={"mashing-" + index} testID={"mashing-step"}>
                <Text style={[styles.sectionItem, styles.italicText]}>
                  Etape n°{index}
                </Text>
                <Text style={styles.sectionItem}>
                  {step.temperature}°C {step.duration}mn
                </Text>
              </View>
            ))}
          </View>
          <View style={[viewContent.formCard, styles.recipeCard]}>
            <Text style={styles.sectionTitle}>Ebullition</Text>
            {internalRecipe?.steps.boiling.map((step, index) => (
              <View key={"boiling-" + index} testID={"boiling-step"}>
                <Text style={[styles.sectionItem, styles.italicText]}>
                  Etape n°{index}
                </Text>
                <Text style={styles.sectionItem}>
                  Ajout: {step.duration}mn, durée: {step.duration}mn
                </Text>
              </View>
            ))}
          </View>
          <View style={[viewContent.formCard, styles.recipeCard]}>
            <Text style={styles.sectionTitle}>Fermentation</Text>
            <Text style={[styles.sectionItem, styles.italicText]}>
              Primaire
            </Text>
            <Text style={styles.sectionItem}>
              {internalRecipe?.steps.fermenting.steps[0].duration}j à{" "}
              {internalRecipe?.steps.fermenting.steps[0].temperature}°C
            </Text>
            <Text style={[styles.sectionItem, styles.italicText]}>
              Secondaire
            </Text>
            <Text style={styles.sectionItem}>
              {internalRecipe?.steps.fermenting.steps[1].duration}j à{" "}
              {internalRecipe?.steps.fermenting.steps[1].temperature}°C
            </Text>
            <Text style={[styles.sectionItem, styles.italicText]}>
              Refermentation (en bouteille)
            </Text>
            <Text style={styles.sectionItem}>
              {internalRecipe?.steps.fermenting.steps[2].duration}j à{" "}
              {internalRecipe?.steps.fermenting.steps[2].temperature}°C
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.returnToList}>
        <Button
          title={"Retour à la liste des recettes"}
          onPress={onListReturnPress}
          testID={"recipes-list-button"}
        />
      </View>
    </View>
  );

  /* Events */
  function onListReturnPress() {
    navigation.navigate(Routes.RECIPES, {});
  }
}

/* Exports */
export { Recipe };
