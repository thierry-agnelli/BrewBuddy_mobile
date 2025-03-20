import { useState } from "react";
import { ScrollView, View, Text } from "react-native";

import { Input, Button } from "@components";
import { premadeClasses } from "@helpers";
import { MashingRest } from "../../../models";
import { ChangeTextEvent } from "@models";
import { recipeStore, updateMashRest } from "../../../store/store";

import { styles } from "./MashRest.style";

/**
 * Mesh rest props
 */
type MeshRestProps = {
  multiRest: boolean;
};

/**
 * Mashing component.
 */
function MashRest({ multiRest }: MeshRestProps) {
  const {
    mashing: { mashRests },
  } = recipeStore.getState();

  const [restNumber, setRestNumber] = useState<number>(3);

  const { viewContent } = premadeClasses;

  return (
    <View style={styles.mashRest} testID={"mash-rest"}>
      <View style={styles.sideBox} />
      <ScrollView style={styles.restBox}>
        {Array.from({ length: multiRest ? restNumber : 1 }, (_, index) => (
          <View
            style={[viewContent.formCard, styles.rest]}
            key={"mesh-rest-" + index}
            testID={"rest"}
          >
            {multiRest && (
              <View style={styles.restLabelBox}>
                <Text style={styles.label}>Palier {index + 1}</Text>
              </View>
            )}
            <View style={styles.restContentBox}>
              <View style={styles.inputBox}>
                <Input
                  value={String(mashRests?.[index]?.temperature || "")}
                  label={"Température"}
                  placeholder={"T°C"}
                  keyboardType={"numeric"}
                  testID={"temperature-input"}
                  onChangeText={(e: ChangeTextEvent) =>
                    setMashRest(index, "temperature", parseInt(e.value, 10))
                  }
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  value={String(mashRests?.[index]?.duration || "")}
                  min={0}
                  label={"Durée(mn)"}
                  placeholder={"Durée"}
                  keyboardType={"numeric"}
                  testID={"duration-input"}
                  onChangeText={(e: ChangeTextEvent) =>
                    setMashRest(index, "duration", parseInt(e.value, 10))
                  }
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addRestBox}>
        {multiRest && (
          <Button
            title={"+"}
            style={{ button: viewContent.addButton }}
            onPress={() => setRestNumber(restNumber + 1)}
          />
        )}
      </View>
    </View>
  );

  /**
   * Set mash rests.
   */
  function setMashRest<K extends keyof MashingRest>(
    index: number,
    mashingRestKey: K,
    value: MashingRest[K],
  ) {
    recipeStore.dispatch(
      updateMashRest({ restKey: mashingRestKey, restIndex: index, value }),
    );
  }
}

/* Exports */
export { MashRest };
