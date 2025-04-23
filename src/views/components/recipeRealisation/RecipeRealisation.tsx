import { useState } from "react";
import { View } from "react-native";

import { Button, Text } from "@components";
import { DrawerScreenViewProps, Routes } from "@models";
import { premadeClasses } from "@helpers";
import { Banner } from "@components";

// eslint-disable-next-line max-len
import { RecipeRealisationProvider } from "./context/RecipeRealisationProvider.tsx";
import { useRealisationContext } from "./hooks/useRealisationContext.ts";

import { styles } from "./RecipeRealisation.style";
import { circle } from "@assets";

/**
 * Recipe Realisation context wrapper.
 */
function RecipeRealisation({
  navigation,
  route,
}: DrawerScreenViewProps<Routes.RECIPE_REALISATION>) {
  const { recipe } = route.params;

  return (
    <RecipeRealisationProvider recipe={recipe} navigation={navigation}>
      <BaseRecipeRealisation />
    </RecipeRealisationProvider>
  );
}

/**
 * Recipe Realisation view.
 */
function BaseRecipeRealisation() {
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const {
    isRecipeStarted,
    recipe,
    stepTitle,
    isLastStep,
    StepComponent,
    nextStep,
    navigation,
  } = useRealisationContext();

  const { layout, viewTitle, viewContent } = premadeClasses;

  return (
    <View style={layout}>
      <Banner />
      <View style={styles.recipeRealisationLayout}>
        <View style={styles.realisationContent}>
          <Text style={viewTitle}>{recipe?.profil.recipeName}</Text>
          <Text style={viewContent.title}>{stepTitle}</Text>
          <View style={styles.realisationStep}>
            <StepComponent />
          </View>
        </View>
      </View>
      {isRecipeStarted && (
        <View>
          {isLastStep ? (
            <Button
              title={"Terminer"}
              style={styles}
              disabled={isRequesting}
              onPress={onRealisationEndPressHandler}
            />
          ) : (
            <Button
              title={!isRequesting ? "Suivant" : undefined}
              icon={isRequesting ? circle : undefined}
              animationSpeed={1}
              style={styles}
              disabled={isRequesting}
              onPress={onNextStepPressHandler}
            />
          )}
        </View>
      )}
    </View>
  );

  /**
   * On next step press handler.
   */
  function onNextStepPressHandler() {
    setIsRequesting(true);

    nextStep().finally(() => {
      setIsRequesting(false);
    });
  }

  /**
   * On Realisation end press handler.
   */
  function onRealisationEndPressHandler() {
    navigation.navigate(Routes.HOME, {});
  }
}

/* Exports */
export { RecipeRealisation };
