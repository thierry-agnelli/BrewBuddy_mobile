import { View } from "react-native";

import { Button, Text } from "@components";
import { premadeClasses } from "@helpers";

import { useRealisationContext } from "../../hooks/useRealisationContext.ts";
import { Routes } from "@models";

import { styles } from "./RealisationServiceUnavailable.style";

/**
 * Realisation service unavailable component.
 */
function RealisationServiceUnavailable() {
  const { navigation } = useRealisationContext();

  const { layout } = premadeClasses;
  return (
    <View style={[layout, styles.realisationServiceUnavailable]}>
      <View>
        <Text>Le service de réalisation de recette</Text>
        <Text> est momentanément indisponible.</Text>
        <Text>Veuillez réessayer ultérieurement.</Text>
      </View>
      <Button
        title={"Accueil"}
        onPress={() => navigation.navigate(Routes.HOME, {})}
      />
    </View>
  );
}

/* Exports */
export { RealisationServiceUnavailable };
