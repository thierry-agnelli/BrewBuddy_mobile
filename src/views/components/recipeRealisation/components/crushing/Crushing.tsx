import { ScrollView, View } from "react-native";

import { Text } from "@components";
import { premadeClasses } from "@helpers";

import { useRealisationContext } from "../../hooks/useRealisationContext.ts";
import { IngredientEventData } from "@models";

import { styles } from "./Crushing.style";

function Crushing() {
  const { getCurrentEvent } = useRealisationContext();

  const currentEvent = getCurrentEvent<IngredientEventData[]>();

  const { viewContent } = premadeClasses;

  return (
    <View style={styles.crushing}>
      <Text style={viewContent.text}>Concasser les malts</Text>
      <ScrollView>
        <View style={styles.maltsList}>
          {currentEvent.event.data[0].ingredients.map((ingredient) => (
            <View
              key={"crushing-" + ingredient.name}
              style={viewContent.formCard}
            >
              <Text>
                {ingredient.name} {ingredient.quantity + ingredient.measureUnit}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* Exports */
export { Crushing };
