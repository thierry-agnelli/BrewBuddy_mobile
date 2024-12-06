import { TextInput, TextInputProps, View } from "react-native";
import { Text } from "@components";
import { ChangeTextEvent, StyleProps } from "@models";

import { styles as baseStyles } from "./Input.style";
import { useComputeStyles } from "@hooks";

/* Models */
type InputStyleProps = StyleProps<typeof baseStyles>;

type InputProps = Omit<TextInputProps, "style" | "onChangeText"> & {
  label?: string;
  required?: boolean;
  name?: string;
  style?: InputStyleProps | InputStyleProps[];
  onChangeText?: (e: ChangeTextEvent) => void;
};

/**
 * Input.
 */
function Input(props: InputProps) {
  const { label, required, name, style, onChangeText, ...baseInputProps } =
    props;

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
        style={[computedStyle.field, computedStyle.fieldError]}
        onChangeText={onChangeTexthandler}
        testID="input"
        {...baseInputProps}
      />
    </View>
  );

  /* Handlers */

  /**
   * On Text change handler.
   */
  function onChangeTexthandler(value: string) {
    onChangeText?.({ name, value });
  }
}

/* Exports */
export { Input };
export type { InputProps };
