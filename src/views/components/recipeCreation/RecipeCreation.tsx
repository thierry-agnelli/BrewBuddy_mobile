import { useMemo, useState } from "react";
import { View, Text } from "react-native";

import { premadeClasses } from "@helpers";
import { Button, Banner } from "@components";

// eslint-disable-next-line max-len
import { RecipeCreationContextProvider } from "./context/RecipeCreationContextProvider";
import { useRecipeCreationContext } from "./hooks";
import {
  BeerProfile,
  IngredientsList,
  Mashing,
  Boiling,
  Fermentation,
  Summary,
} from "./components";

import { styles } from "./RecipeCreation.style";

/* Constants */
const RECIPE_CREATION_STEP = [
  {
    stepTitle: "Profile de la bière",
    stepComponent: BeerProfile,
  },
  {
    stepTitle: "Ingrédients",
    stepComponent: IngredientsList,
  },
  {
    stepTitle: "Empâtage",
    stepComponent: Mashing,
  },
  {
    stepTitle: "Ebullition",
    stepComponent: Boiling,
  },
  {
    stepTitle: "Fermentation",
    stepComponent: Fermentation,
  },
];

/**
 * Recipe Creation component.
 */
function RecipeCreation() {
  return (
    <RecipeCreationContextProvider>
      <BaseRecipeCreation />
    </RecipeCreationContextProvider>
  );
}

/**
 * Base recipe creation component.
 */
function BaseRecipeCreation() {
  const [viewRecipeModal, setViewRecipeModal] = useState<boolean>(false);

  const { step, setStep } = useRecipeCreationContext();

  const StepComponent = useMemo(
    () => RECIPE_CREATION_STEP[step].stepComponent,
    [step],
  );

  const { layout, viewContent } = premadeClasses;

  return (
    <View
      style={[layout, styles.recipeCreationLayout]}
      testID="recipe-creation"
    >
      <Banner />
      <View style={viewContent.titleBox}>
        <Text style={viewContent.title}>
          {RECIPE_CREATION_STEP[step].stepTitle}
        </Text>
      </View>
      <View style={styles.formBox}>
        <StepComponent />
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonBox}>
          {step > 0 ? (
            <Button
              title={"Précédent"}
              style={{ button: styles.button }}
              onPress={onPreviousStepPressHandler}
            />
          ) : null}
        </View>
        <View style={styles.buttonBox}>
          <Button
            title={
              step < RECIPE_CREATION_STEP.length - 1 ? "Suivant" : "Terminer"
            }
            style={{ button: styles.button }}
            onPress={
              step < RECIPE_CREATION_STEP.length - 1
                ? onNextStepPressHandler
                : onRecipeEndedPressHandler
            }
          />
        </View>
      </View>
      {viewRecipeModal && <Summary onConfirmation={onModalConfirmation} />}
    </View>
  );

  /* Events */

  /**
   * Previous step handler.
   */
  function onPreviousStepPressHandler() {
    if (step === 0) return;
    setStep(step - 1);
  }

  /**
   * Next Step handler
   */
  function onNextStepPressHandler() {
    if (step === RECIPE_CREATION_STEP.length - 1) return;

    setStep(step + 1);
  }

  /**
   * Recipe creation ended handler.
   */
  function onRecipeEndedPressHandler() {
    setViewRecipeModal(true);
  }

  /**
   * On modal confirmation.
   */
  function onModalConfirmation(isConfirmed: boolean) {
    setViewRecipeModal(isConfirmed);
  }
}

/* Export */
export { RecipeCreation };
