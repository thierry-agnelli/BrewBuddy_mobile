import { View } from "react-native";

import { Input, Text } from "@components";
import { premadeClasses } from "@helpers";
import { FermentationStepData, Fermentation } from "../../../models";
import { ChangeTextEvent } from "@models";
import { recipeStore, updateFermentation } from "../../../store/store";

import { styles } from "./FermentationStep.style";

/**
 * Mesh rest props
 */
type FermentationStepProps = {
  label: string;
  step: keyof Fermentation;
};

/**
 * Mashing component.
 */
function FermentationStep({ label, step }: FermentationStepProps) {
  const { viewContent } = premadeClasses;

  const { fermentation } = recipeStore.getState();

  return (
    <View
      style={[viewContent.formCard, styles.fermentationStep]}
      testID={"fermentation-step"}
    >
      <View style={styles.stepLabelBox}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.stepContentBox}>
        <Input
          value={
            fermentation[step].temperature
              ? String(fermentation[step].temperature)
              : undefined
          }
          label={"Température"}
          name={"temperature"}
          placeholder={"T°C"}
          keyboardType={"numeric"}
          testID={"temperature-input"}
          onChangeText={setFermentationStepRest}
          style={styles}
        />
        <Input
          value={
            fermentation[step].duration
              ? String(fermentation[step].duration)
              : undefined
          }
          min={0}
          name={"duration"}
          label={"Durée(j)"}
          placeholder={"Durée"}
          keyboardType={"numeric"}
          testID={"duration-input"}
          onChangeText={setFermentationStepRest}
          style={styles}
        />
      </View>
    </View>
  );

  /**
   * Set mash rests.
   */
  function setFermentationStepRest(e: ChangeTextEvent) {
    let numberValue = parseInt(e.value, 10);
    numberValue = isNaN(numberValue) ? 0 : numberValue;

    recipeStore.dispatch(
      updateFermentation({
        step,
        fermentationKey: e.name as keyof FermentationStepData,
        value: numberValue,
      }),
    );
  }
}

/* Exports */
export { FermentationStep };
