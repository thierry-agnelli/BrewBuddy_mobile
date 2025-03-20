import { Keyboard, Pressable, View } from "react-native";

import { Input, Select, Slider } from "@components";
import { ChangeEvent } from "@models";
import { premadeClasses } from "@helpers";
import { recipeStore, updateBeerProfile } from "../../store/store";

import { styles } from "./BeerProfile.style";

const TYPE = ["Pils", "IPA", "NEIPA", "Pale Ale", "Lagger", "Sour", "Stout"];

/**
 * Beer Profile component.
 */
function BeerProfile() {
  const { beerProfile } = recipeStore.getState();

  const { viewContent } = premadeClasses;

  return (
    <Pressable
      style={[viewContent.formCard, styles.beerProfile]}
      testID={"beer-profile"}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.topElementGroup}>
        <View style={styles.elementGroup}>
          <View style={styles.element}>
            <Input
              label={"Nom"}
              style={{
                input: styles.beerNameInput,
              }}
              value={beerProfile.name}
              placeholder="Nom"
              onChangeText={(e: ChangeEvent) =>
                recipeStore.dispatch(
                  updateBeerProfile({
                    beerProfileKey: "name",
                    value: String(e.value),
                  }),
                )
              }
              testID={"beer-name-input"}
            />
          </View>
          <View style={styles.element}>
            <Select
              data={TYPE}
              value={beerProfile.type}
              label={"Type"}
              placeholder={"Type..."}
              style={styles}
              onSelect={(type) =>
                recipeStore.dispatch(
                  updateBeerProfile({
                    beerProfileKey: "type",
                    value: type,
                  }),
                )
              }
            />
          </View>
        </View>
        <View style={styles.elementGroup}>
          <View style={styles.element}>
            <Slider
              label="EBC"
              value={beerProfile.ebc}
              max={120}
              onChange={(ebc) =>
                recipeStore.dispatch(
                  updateBeerProfile({
                    beerProfileKey: "ebc",
                    value: ebc,
                  }),
                )
              }
              testID={"ebc"}
            />
          </View>
          <View style={styles.element}>
            <Slider
              label="IBU"
              max={120}
              value={beerProfile.ibu}
              onChange={(ibu) =>
                recipeStore.dispatch(
                  updateBeerProfile({
                    beerProfileKey: "ibu",
                    value: ibu,
                  }),
                )
              }
              testID={"ibu"}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomElementGroup}>
        <View style={styles.elementGroup}>
          <Input
            label={"Description"}
            style={{
              input: styles.descriptionInput,
              field: styles.descriptionInputField,
            }}
            value={beerProfile.description}
            placeholder="Description"
            onChangeText={(e: ChangeEvent) =>
              recipeStore.dispatch(
                updateBeerProfile({
                  beerProfileKey: "description",
                  value: String(e.value),
                }),
              )
            }
            multiline
            testID={"description-input"}
          />
        </View>
      </View>
    </Pressable>
  );
}

/* Exports */
export { BeerProfile };
