import { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  KeyboardTypeOptions,
} from "react-native";
import { Text } from "@components";
import { ChangeEvent, ChangeTextEvent, StyleProps } from "@models";
import { theme } from "@theme";

import { styles as baseStyles } from "./Input.style";
import { useComputeStyles } from "@hooks";

/* Models */

/*
 * Style props.
 */
type InputStyleProps = StyleProps<typeof baseStyles>;

/**
 * Input Min Max if keyboard type os numeric.
 */
type InputMinMax<K extends KeyboardTypeOptions> = K extends
  | "numeric"
  | "number-pad"
  | "decimal-pad"
  ? number
  : never;

/**
 * Input props.
 */
type InputProps<K extends KeyboardTypeOptions> = Omit<
  TextInputProps,
  "style" | "onChangeText"
> & {
  label?: string;
  required?: boolean;
  name?: string;
  style?: InputStyleProps | InputStyleProps[];
  onChangeText?: (e: ChangeTextEvent) => void;
  onInputBlur?: (e: ChangeEvent) => void;
  keyboardType?: K;
  min?: InputMinMax<K>;
  max?: InputMinMax<K>;
};

/**
 * Input.
 */
function Input<Keyboard extends KeyboardTypeOptions = "default">({
  label,
  required,
  name,
  value = "",
  style,
  editable = true,
  min,
  max,
  keyboardType,
  onChangeText,
  ...baseInputProps
}: InputProps<Keyboard>) {
  const [currentValue, setCurrentValue] = useState<string>(value || "");

  /* Hooks */
  const computedStyle = useComputeStyles<InputStyleProps>(baseStyles, style);

  return (
    <View style={computedStyle.input}>
      <View style={computedStyle.labelBox}>
        {label && (
          <Text style={computedStyle.label} testID="input-label">
            {label}
          </Text>
        )}
        {required && (
          <Text testID="input-required" style={computedStyle.requiredError}>
            {" *"}
          </Text>
        )}
      </View>
      <TextInput
        style={[
          computedStyle.field,
          computedStyle.fieldError,
          !editable && computedStyle.disabled,
        ]}
        placeholderTextColor={theme.color.informative}
        onChangeText={onChangeTextHandler}
        testID="input"
        value={currentValue}
        editable={editable}
        keyboardType={keyboardType}
        {...baseInputProps}
      />
    </View>
  );

  /* Handlers */

  /**
   * On Text change handler.
   */
  function onChangeTextHandler(inputValue: string) {
    let consolidateValue = inputValue;

    const numberInputValue = parseInt(inputValue, 10);

    // Check min and max if defined.
    if (
      inputValue !== "" &&
      !isNaN(numberInputValue) &&
      (min !== undefined || max)
    ) {
      consolidateValue = String(numberInputValue);
      // Min value.
      if (min !== undefined && numberInputValue < min)
        consolidateValue = String(min);
      // Max value.
      if (max && numberInputValue > max) consolidateValue = String(max);
    }

    setCurrentValue(consolidateValue);
    onChangeText?.({ name, value: consolidateValue });
  }
}

/* Exports */
export { Input };
export type { InputProps };
