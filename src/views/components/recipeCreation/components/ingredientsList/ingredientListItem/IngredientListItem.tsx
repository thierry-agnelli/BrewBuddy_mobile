import { useState } from "react";
import { View } from "react-native";

import { Select, Input, Button, CheckBox, Text } from "@components";
import { IngredientsList, IngredientsCategory } from "@models";
import { RecipeIngredient, RecipeIngredients } from "../../../models";
import { ChangeTextEvent } from "@models";
import { premadeClasses } from "@helpers";

import { useRecipeCreationContext } from "../../../hooks";
import { recipeStore, updateIngredients } from "../../../store/store";
import { styles } from "./IngredientListItem.style";

/* Models */

/**
 * IngredientListItem props.
 */
type IngredientListItemProps<C extends IngredientsCategory> = {
  category: keyof RecipeIngredients;
  data: IngredientsList[C];
  resugaring?: boolean;
};

/**
 * Ingredient form props.
 */
type IngredientFormItemProps<C extends IngredientsCategory> =
  IngredientListItemProps<C> & {
    label: string;
    index: number;
  };

/**
 * IngredientListItem component.
 */
function IngredientListItem<C extends IngredientsCategory>({
  category,
  data,
  resugaring,
}: IngredientListItemProps<C>) {
  const ingredients = recipeStore.getState().ingredients[category];
  // FirstChar to upper case.
  const label = category.charAt(0).toUpperCase() + category.slice(1);

  const [ingredientNumber, setIngredientNumber] = useState<number>(
    ingredients.length || 1,
  );

  const { viewContent } = premadeClasses;

  return (
    <View
      style={[viewContent.formCard, styles.ingredientListItem]}
      testID="ingredient-list-item"
    >
      <View style={styles.leftBox}>
        <Text style={styles.ingredientLabel}>{label}</Text>
        <View style={styles.ingredientForm}>
          {Array.from({ length: ingredientNumber }, (_, index) => (
            <IngredientFormItem
              category={category}
              key={index}
              data={data}
              label={label}
              index={index}
              resugaring={resugaring}
            />
          ))}
        </View>
      </View>
      <View style={styles.rightBox}>
        <Button
          title={"+"}
          style={{ button: viewContent.addButton }}
          testID={"ingredient-add-button"}
          onPress={() => setIngredientNumber(ingredientNumber + 1)}
        />
      </View>
    </View>
  );
}

/**
 * Ingredient From Item.
 */
function IngredientFormItem<C extends IngredientsCategory>({
  category,
  data,
  label,
  index,
  resugaring,
}: IngredientFormItemProps<C>) {
  const [currentIngredient, setCurrentIngredient] = useState(
    recipeStore.getState().ingredients[category]?.[index],
  );

  const [dosage, setDosage] = useState<string>(
    currentIngredient?.dosage ? String(currentIngredient?.dosage) : "",
  );

  const { ingredientsList } = useRecipeCreationContext();

  const selectData = data ? data.map((ingredientEl) => ingredientEl.name) : [];

  return (
    <View style={styles.IngredientFormItem} testID={"ingredient-form-item"}>
      <View style={styles.selectBox}>
        <Select
          data={selectData}
          value={currentIngredient?.name}
          style={styles}
          placeholder={label}
          onSelect={(value) => setIngredient("name", String(value))}
        />
      </View>
      <View style={styles.resugaringBox}>
        {resugaring && (
          <CheckBox
            style={{ checkbox: styles.resugaring, box: styles.resugaring }}
            checked={currentIngredient?.resugaring}
            testID={"resugaring"}
            onChange={(e) => setIngredient("resugaring", e.value)}
          />
        )}
      </View>
      <View style={styles.qtyBox}>
        {currentIngredient?.dosage ? (
          <View style={[styles.qty, styles.dosage]} testID={"dosage"}>
            <Text>{dosage}</Text>
          </View>
        ) : (
          <Input
            value={String(currentIngredient?.qty || "")}
            placeholder="Qté"
            keyboardType={"number-pad"}
            style={{ input: styles.qty }}
            editable={!!currentIngredient}
            onChangeText={(e: ChangeTextEvent) =>
              setIngredient("qty", parseInt(e.value, 10))
            }
          />
        )}
        <Text style={styles.measureUnit}>{currentIngredient?.measureUnit}</Text>
      </View>
    </View>
  );

  /* Methods */

  /**
   * Set ingredient.
   */
  function setIngredient<K extends keyof RecipeIngredient>(
    ingredientKey: K,
    value: RecipeIngredient[K],
  ) {
    const ingredientModel = ingredientsList[category]!.find(
      (ingredient) =>
        ingredient.name ===
        (ingredientKey === "name" ? value : currentIngredient?.name),
    )!;

    recipeStore.dispatch(
      updateIngredients({
        ingredientIndex: index,
        ingredientKey,
        value,
        ingredientModel,
      }),
    );

    setCurrentIngredient(recipeStore.getState().ingredients[category]?.[index]);

    if (ingredientKey === "name") {
      const current = data.find(
        (ingredientItem) => ingredientItem.name === value,
      );

      if (current?.dosage) setDosage(String(current.dosage));
    }
  }
}

/* Exports */
export { IngredientListItem };
