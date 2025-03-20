import { ScrollView } from "react-native";
import { useRecipeCreationContext } from "../../hooks";

import { IngredientsCategory } from "../../models";
// eslint-disable-next-line max-len
import { IngredientListItem } from "./ingredientListItem/IngredientListItem.tsx";

import { styles } from "./IngredientsList.style";

/**
 * IngredientList component.
 */
function IngredientsList() {
  const { ingredientsList } = useRecipeCreationContext();

  return (
    <ScrollView style={styles.ingredientList} testID="ingredients-list">
      {Object.values(IngredientsCategory).map((category) => (
        <IngredientListItem
          key={"ingredient-list-item-" + category}
          category={category}
          data={ingredientsList[category]}
          resugaring={category === IngredientsCategory.SUGARS}
        />
      ))}
    </ScrollView>
  );
}

/* Exports */
export { IngredientsList };
