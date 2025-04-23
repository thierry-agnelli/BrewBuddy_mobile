import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import { premadeClasses } from "@helpers";
import { Button, CheckBox, Text } from "@components";
import { IngredientsCategory, RecipeModel, Routes } from "@models";
import { firstCharUpperCase } from "@utils";
import { postRecipe, validateRecipe } from "@services";
import { useAppContext } from "@hooks";
import { circle } from "@assets";

import { useRecipeCreationContext } from "../../hooks";
import { recipeStore, clearRecipe } from "../../store/store.ts";
import { checkRecipeCreation } from "../../utils/checkRecipeCreation.ts";

import { styles } from "./Summary.style";

/**
 * Modal props.
 */
type ModalProps = {
  onConfirmation: () => void;
};

function Summary({ onConfirmation }: ModalProps) {
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const isRecipeEnded = useRef<boolean>(false);

  const { authToken } = useAppContext();
  const { navigate, setStep } = useRecipeCreationContext();

  const { viewContent } = premadeClasses;

  const recipe = recipeStore.getState();
  const { beerProfile, ingredients, mashing, boiling, fermentation } = recipe;
  const isRecipeValid = checkRecipeCreation();

  return (
    <View style={styles.summary} testID={"recipe-summary"}>
      <View style={[viewContent.formCard, styles.summaryCard]}>
        <Text style={viewContent.title}>Confirmation de la recette</Text>
        <View style={styles.summaryEndedBox}>
          <CheckBox
            label={
              "Je valide ma recette " +
              "(Vous pourrez toujours la valider plus tard)"
            }
            onChange={(e) => (isRecipeEnded.current = e.value)}
            testID={"recipe-ended"}
          />
        </View>
        <ScrollView style={styles.summaryScroll}>
          <Text style={styles.summaryStepTile}>Profile</Text>
          <View style={viewContent.formCard}>
            <View style={styles.summaryNameType}>
              <Text
                style={
                  beerProfile.name
                    ? styles.summaryBoldText
                    : styles.summaryError
                }
              >
                {beerProfile.name || "<NOM>"}
              </Text>
              <Text> - </Text>
              <Text
                style={
                  beerProfile.type
                    ? styles.summaryBoldText
                    : styles.summaryError
                }
              >
                {beerProfile.type || "<TYPE>"}
              </Text>
            </View>
            <Text style={styles.summaryItalicText}>
              Ibu: {beerProfile.ibu} ebc:{beerProfile.ebc}
            </Text>
            <View style={[styles.description]}>
              <Text style={!beerProfile.description && styles.summaryError}>
                {beerProfile.description || "<DESCRIPTION>"}
              </Text>
            </View>
          </View>
          <Text style={styles.summaryStepTile}>Ingrédients</Text>

          <View style={viewContent.formCard}>
            {Object.values(IngredientsCategory).map((category) => (
              <View
                key={category}
                style={styles.cardItemTitle}
                testID={"ingredient-summary-card"}
              >
                <Text style={styles.summaryStepSubTitle}>
                  {firstCharUpperCase(category)}
                </Text>
                <View>
                  {ingredients[category].map((ingredient, index) => (
                    <Text
                      key={ingredient.name + index}
                      testID={`ingredient-${category}-summary`}
                    >
                      {ingredient.name}
                      {" " +
                        (ingredient.dosage
                          ? ingredient.dosage
                          : ingredient.qty)}
                      {ingredient.measureUnit}
                      {ingredient.resugaring ? " (resucrage)" : ""}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.summaryBoldText}>Empâtage</Text>
          <View style={viewContent.formCard}>
            <Text style={styles.cardItemTitle} testID={"mash-out"}>
              Mashout: {mashing.mashOut ? "Oui" : "Non"}
            </Text>
            <Text style={styles.summaryStepSubTitle}>Etapes :</Text>
            {mashing.mashRests.map((mashRest, index) => (
              <Text key={"mashing" + index} testID={"mash-rest"}>
                {index + 1}: {mashRest.temperature}°C {mashRest.duration} mn
              </Text>
            ))}
          </View>

          <Text style={styles.summaryBoldText}>Ebullition</Text>
          <View style={viewContent.formCard}>
            {boiling.boilingSteps.map((step, index) => (
              <Text key={index + step.name} testID={"boiling-step"}>
                {step.name}: ajout {step.addingTime}mn / durée {step.duration}
                mn
              </Text>
            ))}
          </View>

          <Text style={styles.summaryBoldText}>Fermentation</Text>
          <View style={viewContent.formCard}>
            <Text>
              Primaire: {fermentation.primary.temperature}°C{" "}
              {fermentation.primary.duration}j
            </Text>
            <Text>
              Secondaire: {fermentation.secondary.temperature}°C{" "}
              {fermentation.secondary.duration}j
            </Text>
            <Text>
              Refermentation: {fermentation.refermenting.temperature}°C{" "}
              {fermentation.refermenting.duration}j
            </Text>
          </View>
        </ScrollView>
        <Text
          style={[styles.summaryErrorMessage, styles.summaryError]}
          testID={"summary-error"}
        >
          {error}
        </Text>
        <View style={styles.summaryCardFooter}>
          <Button
            title="Retour"
            disabled={isRequesting}
            style={{ button: styles.summaryCardButton }}
            testID={"return-button"}
            onPress={() => onConfirmation()}
          />
          <Button
            title={!isRequesting ? "Envoyer" : undefined}
            icon={isRequesting ? circle : undefined}
            disabled={!isRecipeValid || isRequesting}
            animationSpeed={1}
            style={{ button: styles.summaryCardButton }}
            testID={"send-button"}
            onPress={onSendRecipePressHandler}
          />
        </View>
      </View>
    </View>
  );

  /* Events */

  /**
   * On send recipe press handler.
   */
  function onSendRecipePressHandler() {
    if (!authToken) return;

    const recipeModel = formatRecipe();

    setIsRequesting(true);

    postRecipe(recipeModel, authToken)
      .then((recipeResponse) => {
        onConfirmation();

        // Clear store
        recipeStore.dispatch(clearRecipe());

        setStep(0);

        if (isRecipeEnded.current) {
          validateRecipe(recipeResponse._id, authToken)
            .then(() => {
              navigate(Routes.RECIPE, {
                recipe: recipeResponse._id,
              });
            })
            .catch((err) => {
              setError(err);
            });
        } else navigate(Routes.HOME, {});
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsRequesting(false);
      });
  }

  /* Methods */
  function formatRecipe(): RecipeModel {
    return {
      isRecipeDoneWriting: isRecipeEnded.current,
      isInBlackList: false,
      profil: {
        recipeName: recipe.beerProfile.name,
        description: recipe.beerProfile.description,
        ebc: recipe.beerProfile.ebc,
        ibu: recipe.beerProfile.ibu,
        style: recipe.beerProfile.type,
      },
      recipeIngredients: Object.values(IngredientsCategory).map((category) => {
        return {
          category,
          ingredients: recipe.ingredients[category].map((ingredient) => ({
            ingredientID: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.qty || null,
            measureUnit: ingredient.measureUnit,
            sugar: !!ingredient?.resugaring,
          })),
        };
      }),
      steps: {
        mashing: {
          multiStage: recipe.mashing.mashRests.length > 1,
          steps: recipe.mashing.mashRests.map((mashRest) => ({
            temperature: mashRest.temperature,
            duration: mashRest.duration,
          })),
        },
        boiling: recipe.boiling.boilingSteps.map((boilingStep) => ({
          duration: boilingStep.duration,
          whenToAdd: boilingStep.addingTime,
          ingredient: {
            ingredientID: boilingStep.ingredient.id,
            quantity: boilingStep.ingredient.qty,
          },
        })),
        fermenting: {
          totalDurationOfBaseFermenting:
            recipe.fermentation.primary.duration +
            recipe.fermentation.secondary.duration,
          steps: [
            {
              name: "primary",
              temperature: recipe.fermentation.primary.temperature,
              duration: recipe.fermentation.primary.duration,
            },
            {
              name: "secondary",
              temperature: recipe.fermentation.secondary.temperature,
              duration: recipe.fermentation.secondary.duration,
            },
            {
              name: "refermenting",
              temperature: recipe.fermentation.refermenting.temperature,
              duration: recipe.fermentation.refermenting.duration,
            },
          ],
        },
      },
    };
  }
}

/* Exports */
export { Summary };
