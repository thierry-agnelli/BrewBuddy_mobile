import { useState } from "react";
import { View } from "react-native";
import BaseSlider from "@react-native-community/slider";

import { Text } from "@components";
import { premadeClasses } from "@helpers";
import { useComputeStyles } from "@hooks";
import { StyleProps } from "@models";
import { theme } from "@theme";

import { styles as baseStyles } from "./Slider.style";

/* Models */

/**
 * Style props.
 */
type SelectStyleProps = StyleProps<typeof baseStyles>;

/**
 * Slider props.
 */
type SliderProps = {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  style?: SelectStyleProps;
  testID?: string;
  onChange?: (value: number) => void;
};

/**
 * Slider componet.
 */
function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  label,
  style,
  testID,
  onChange,
}: SliderProps) {
  const [currentValue, setCurrentValue] = useState<number>(
    value || (max + min) / 2,
  );

  const computedStyle = useComputeStyles<SelectStyleProps>(baseStyles, style);
  const { viewContent } = premadeClasses;

  return (
    <View style={computedStyle.slider} testID={testID || "slider"}>
      <View style={computedStyle.titleContainer}>
        <Text style={[viewContent.title, computedStyle.text]}>
          {label ? label + ": " : ""}
          {currentValue}
        </Text>
      </View>
      <BaseSlider
        testID={(testID ? testID + "-" : "") + "base-slider"}
        style={computedStyle.sliderBox}
        value={currentValue}
        minimumValue={min}
        maximumValue={max}
        step={step}
        thumbTintColor={theme.color.primary}
        minimumTrackTintColor={theme.color.primary}
        maximumTrackTintColor={theme.color.informative}
        onValueChange={onSliderChangeValueHandler}
      />
    </View>
  );

  /* Events */

  /**
   * On Slider change value.
   */
  function onSliderChangeValueHandler(val: number) {
    setCurrentValue(val);
    onChange?.(val);
  }
}

/* Exports */
export { Slider };
