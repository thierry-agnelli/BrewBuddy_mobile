import { View } from "react-native";
import { FermentationStep } from "./component/FermentationStep.tsx";

import { styles } from "./Fermentation.style";

/**
 * Fermentation.
 */
function Fermentation() {
  return (
    <View style={styles.fermentation} testID={"fermentation"}>
      <FermentationStep label={"Fermentation primaire"} step={"primary"} />
      <FermentationStep label={"Fermentation secondaire"} step={"secondary"} />
      <FermentationStep
        label={"Refermentation (en bouteille)"}
        step={"refermenting"}
      />
    </View>
  );
}

/* Exports */
export { Fermentation };
