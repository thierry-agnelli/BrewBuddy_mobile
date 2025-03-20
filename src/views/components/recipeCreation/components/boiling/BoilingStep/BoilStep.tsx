import { useState, useMemo, useEffect } from "react";
import { Image, View, Text } from "react-native";

import { premadeClasses } from "@helpers";
import { Select, Input } from "@components";
import { ChangeTextEvent } from "@models";
import { drag } from "@assets";

import {
  BoilingStep,
  BoilingIngredient,
  DraggableItemProps,
  IngredientsCategory,
} from "../../../models";
import { recipeStore } from "../../../store/store.ts";

import { styles } from "./BoilStep.style";

/* Const */
const BOILING_CATEGORY = [
  IngredientsCategory.HOPS,
  IngredientsCategory.MISCELLANEOUS,
];
/* Models */

/**
 * Boiling Element props.
 */
type BoilStepProps = {
  isActive: boolean;
  item: DraggableItemProps;
  step: number;
  ingredientList: BoilingIngredient[];
  onChange: <K extends keyof BoilingStep>(
    step: number,
    unit: string,
    stepKey: K,
    value: BoilingStep[K],
  ) => void;
};

/**
 * BoilStep component.
 */
function BoilStep({ isActive, item, ingredientList, onChange }: BoilStepProps) {
  /* States */
  const [currentIngredient, setCurrentIngredient] = useState<
    BoilingIngredient | undefined
  >(undefined);
  const { key: step } = item;
  const { boiling } = recipeStore.getState();

  /* Hooks */
  // Available select ingredient.
  const availableIngredientsSelectData = useMemo(() => {
    const boilingCategoryIngredient = ingredientList.filter((ingredient) =>
      BOILING_CATEGORY.find((category) => ingredient.category === category),
    );

    return boilingCategoryIngredient.reduce((acc: string[], ingredient) => {
      const isAlreadyUse = boiling.boilingSteps.find(
        (boilingStep) => boilingStep.name === ingredient.name,
      );

      if (!isAlreadyUse) acc.push(ingredient.name);
      return acc;
    }, []);
  }, [boiling.boilingSteps, ingredientList]);

  // Update Qty
  useEffect(() => {
    setCurrentIngredient(
      ingredientList.find(
        (ingredient) =>
          ingredient.name === item?.name ||
          ingredient.name === currentIngredient?.name,
      ),
    );
  }, [ingredientList, currentIngredient?.name, item]);

  /* Render */
  const { viewContent } = premadeClasses;

  return (
    <View
      style={[
        viewContent.formCard,
        styles.boilingStep,
        !item.isAddingTimeValid && styles.addingTimeError,
        isActive && styles.active,
      ]}
      testID={"boiling-step"}
    >
      <View style={styles.dragIcon}>
        <Image source={drag} style={styles.dragIcon} />
      </View>
      <Select
        data={availableIngredientsSelectData}
        style={styles}
        value={item.name}
        onSelect={onIngredientSelectHandler}
      />
      <View style={styles.ingredientQty}>
        <Text style={styles.ingredientQtyText}>{currentIngredient?.qty}</Text>
      </View>
      <Input
        keyboardType={"number-pad"}
        name="addingTime"
        min={0}
        value={item.addingTime ? String(item.addingTime) : undefined}
        style={{ input: styles.boilingInput }}
        placeholder={"temps"}
        editable={!!currentIngredient}
        testID={"add-input"}
        onChangeText={onInputChangeHandler}
      />
      <Input
        keyboardType={"number-pad"}
        name={"duration"}
        min={0}
        value={item.duration ? String(item.duration) : undefined}
        style={{ input: styles.boilingInput }}
        placeholder={"Durée"}
        editable={!!currentIngredient}
        testID={"duration-input"}
        onChangeText={onInputChangeHandler}
      />
    </View>
  );

  /* Events */
  /**
   * On input change handler.
   */
  function onInputChangeHandler(e: ChangeTextEvent) {
    let numberValue = parseInt(e.value, 10);
    numberValue = isNaN(numberValue) ? 0 : numberValue;

    onChange(
      step,
      currentIngredient!.measureUnit,
      e.name as "addingTime" | "duration",
      numberValue,
    );
  }

  /**
   * On Ingredient select handler.
   */
  function onIngredientSelectHandler(newIngredient: string) {
    const ingredientToAdd = ingredientList.find(
      (ingredient) => ingredient.name === newIngredient,
    );
    setCurrentIngredient(ingredientToAdd);

    onChange(step, ingredientToAdd!.measureUnit, "name", newIngredient);
  }
}

/* Exports */
export { BoilStep };
export type { BoilStepProps };
