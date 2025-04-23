import { View, ScrollView } from "react-native";

import { Text, CheckBox } from "@components";
import { premadeClasses } from "@helpers";
import { firstCharUpperCase } from "@utils";
import { IngredientEventData } from "@models";

import { useRealisationContext } from "../../hooks/useRealisationContext.ts";

import { styles } from "./IngredientSetup.style";

function IngredientSetup() {
  const { getCurrentEvent } = useRealisationContext();
  const currentEvent = getCurrentEvent<IngredientEventData[]>();

  const { viewContent } = premadeClasses;

  return (
    <ScrollView style={styles.ingredientSetup}>
      <View style={styles.ingredientList}>
        {currentEvent.event.data.map(
          (dataIngredient) =>
            dataIngredient.ingredients.length > 0 && (
              <View
                key={"realisation-ingredients-" + dataIngredient.category}
                style={[viewContent.formCard, styles.ingredientCard]}
              >
                <View style={styles.cardTitle}>
                  <Text style={viewContent.text}>
                    {firstCharUpperCase(dataIngredient.category)}
                  </Text>
                  <CheckBox style={{ box: styles.checkBoxBorder }} />
                </View>
                {dataIngredient.ingredients.map((ingredient) => (
                  <Text key={"ingredient-" + ingredient.ingredientID}>
                    {ingredient.name}
                    {ingredient.quantity &&
                      " : " + ingredient.quantity + ingredient.measureUnit}
                  </Text>
                ))}
              </View>
            ),
        )}
      </View>
    </ScrollView>
  );
}

/* Exports */
export { IngredientSetup };
