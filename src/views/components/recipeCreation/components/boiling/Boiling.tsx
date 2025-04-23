import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Pressable } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import lodash from "lodash";

import { premadeClasses } from "@helpers";
import { Button } from "@components";

import { BoilStep } from "./BoilingStep/BoilStep.tsx";
import {
  recipeStore,
  updateBoiling,
  updateBoilingStep,
} from "../../store/store.ts";
import {
  IngredientsCategory,
  RecipeIngredient,
  DraggableItemProps,
  BoilingStep,
} from "../../models";

import { styles } from "./Boiling.style";

/* Models */

/**
 * Draggable list render item Props
 */
type DraggableListRenderItemProps = {
  item: DraggableItemProps;
  drag: () => void;
  isActive: boolean;
};

/**
 * Boiling component.
 */
function Boiling() {
  const { boiling, ingredients } = recipeStore.getState();

  const [boilingSteps, setBoilingSteps] = useState<DraggableItemProps[]>([]);
  const [ingredientsList, setIngredientsList] = useState<RecipeIngredient[]>(
    [],
  );
  /* Effect */

  // Ingredient categories.
  const ingredientCategories = useMemo(
    () => Object.values(IngredientsCategory),
    [],
  );

  const computeIngredientsList = useCallback(() => {
    const list: RecipeIngredient[] = [];

    ingredientCategories.forEach((ingredientCategory) => {
      ingredients[ingredientCategory].forEach((ingredient) => {
        list.push({
          ...ingredient,
        });
      });
    });

    return list;
  }, [ingredientCategories, ingredients]);

  // Available Ingredient list.
  useEffect(() => {
    setIngredientsList(computeIngredientsList());
  }, [computeIngredientsList]);

  // Update draggable boiling step data.
  useEffect(() => {
    setBoilingSteps(
      boiling.boilingSteps.length > 0
        ? boiling.boilingSteps.map((step, key) => ({ ...step, key }))
        : [
            {
              key: 0,
              name: "",
              ingredient: {} as RecipeIngredient,
              addingTime: 0,
              isAddingTimeValid: true,
              duration: 0,
            },
          ],
    );
  }, [boiling]);

  /**
   * Draggable item render callback.
   */
  function renderItem({ item, drag, isActive }: DraggableListRenderItemProps) {
    return (
      <Pressable
        key={"boiling-step-" + item.key}
        delayLongPress={300}
        onLongPress={() => drag()}
      >
        <BoilStep
          isActive={isActive}
          item={item}
          ingredientList={ingredientsList}
          onChange={onStepChangeHandler}
        />
      </Pressable>
    );
  }

  /* Render */

  const { viewContent } = premadeClasses;

  return (
    <View style={styles.boiling} testID={"boiling"}>
      <View style={styles.dragList}>
        <DraggableFlatList
          data={boilingSteps}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.key)}
          onDragEnd={onDragEndHandler}
        />
      </View>
      <View style={styles.addStepBox}>
        <Button
          title={"+"}
          style={{ button: viewContent.addButton }}
          onPress={onAddStepButtonPressHandler}
        />
      </View>
    </View>
  );

  /* Events */

  /**
   * On ingredient select handler.
   */
  function onStepChangeHandler<K extends keyof BoilingStep>(
    step: number,
    ingredient: RecipeIngredient,
    boilingKey: K,
    value: BoilingStep[K],
  ) {
    recipeStore.dispatch(
      updateBoilingStep({
        boilingKey,
        stepIndex: step,
        ingredient,
        value,
      }),
    );
    setIngredientsList(computeIngredientsList());
  }

  /**
   * On list Element drag end handler.
   */
  function onDragEndHandler({ data }: DragEndParams<DraggableItemProps>) {
    recipeStore.dispatch(
      updateBoiling({
        value: data,
      }),
    );
    setBoilingSteps(data);
  }

  /**
   * Add boiling step event.
   */
  function onAddStepButtonPressHandler() {
    const currentSteps = lodash.cloneDeep(boilingSteps);

    currentSteps.push({
      key: currentSteps.length,
      name: "",
      ingredient: {} as RecipeIngredient,
      addingTime: 0,
      isAddingTimeValid: true,
      duration: 0,
    });

    setBoilingSteps(currentSteps);
  }
}

/* Exports */
export { Boiling };
export type { DraggableItemProps };
