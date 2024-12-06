import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../text/Text";
import { check } from "@assets";
import { useComputeStyles } from "@hooks";
import { ChangeCheckBoxEvent, StyleProps } from "@models";

import { styles as baseStyles } from "./CheckBox.style";

/* Models */
type CheckBoxStyleProps = StyleProps<typeof baseStyles>;

type CheckBoxProps = {
  checked?: boolean;
  label?: string;
  required?: boolean;
  name?: string;
  style?: CheckBoxStyleProps | CheckBoxStyleProps[];
  testID?: string;
  onChange?: (e: ChangeCheckBoxEvent) => void;
};

/**
 * Checkbox
 */
function CheckBox(props: CheckBoxProps) {
  /* Props */
  const { checked, label, name, required, style, testID, onChange } = props;

  /* States */
  const [checkValue, setCheckedValue] = useState<boolean>(false);

  /* Hooks */
  useEffect(() => {
    setCheckedValue(!!checked);
  }, [checked]);

  /* Hooks */
  const computedStyle = useComputeStyles<CheckBoxStyleProps>(baseStyles, style);

  return (
    <TouchableOpacity
      style={computedStyle.checkbox}
      onPress={onCheckBoxPress}
      testID={testID || "pressable-checkbox"}
    >
      <View style={computedStyle.box}>
        {checkValue && (
          <Image
            source={check}
            style={computedStyle.checkIcon}
            testID="checked-icon"
          />
        )}
      </View>
      {label && (
        <Text
          style={[
            computedStyle.label,
            ...[required && computedStyle.requiredError],
          ]}
          testID="checkbox-label"
        >
          {label}
        </Text>
      )}
      {required && (
        <Text style={computedStyle.requiredError} testID="input-required">
          {" "}
          *
        </Text>
      )}
    </TouchableOpacity>
  );

  /* Handlers */
  function onCheckBoxPress() {
    onChange?.({ value: !checkValue, name });
    setCheckedValue(!checkValue);
  }
}

/* Exports */
export { CheckBox };
export type { CheckBoxProps };
