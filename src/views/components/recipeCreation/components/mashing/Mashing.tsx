import { useState } from "react";
import { View, Text, Switch } from "react-native";

import { CheckBox } from "@components";
import { MashRest } from "./components/MashRest.tsx";
import {
  recipeStore,
  updateMashOut,
  updateMultiMashRests,
} from "../../store/store.ts";

import { theme } from "@theme";
import { styles } from "./Mashing.style";

/**
 * Mashing component.
 */
function Mashing() {
  const { mashing } = recipeStore.getState();

  const [multiRest, setMultiRest] = useState<boolean>(
    mashing.mashRests?.length > 1,
  );

  return (
    <View style={styles.mashing} testID={"mashing"}>
      <View style={styles.optionsBox}>
        <View style={styles.restSelection}>
          <Text>Mono-Palier</Text>
          <Switch
            trackColor={{
              false: theme.color.separator,
              true: theme.color.separator,
            }}
            thumbColor={multiRest ? theme.color.primary : theme.color.secondary}
            ios_backgroundColor={theme.color.separator}
            onValueChange={onMashRestChange}
            value={multiRest}
            testID={"multi-rest-switch"}
          />
          <Text style={multiRest && styles.multiRestLabel}>Multi-Palier</Text>
        </View>
        <CheckBox
          label={"Mash out"}
          checked={mashing.mashOut}
          onChange={(e) =>
            recipeStore.dispatch(updateMashOut({ value: e.value }))
          }
        />
      </View>
      <View style={styles.restsBox}>
        <MashRest multiRest={multiRest} />
      </View>
    </View>
  );

  /* Events */

  /**
   * Multi rest selection.
   */
  function onMashRestChange() {
    setMultiRest(!multiRest);
    recipeStore.dispatch(updateMultiMashRests({ value: !multiRest }));
  }
}

/* Exports */
export { Mashing };
