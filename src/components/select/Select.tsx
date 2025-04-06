import { useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";

import { Text } from "@components";
import { StyleProps } from "@models";
import { useComputeStyles } from "@hooks";
import { aspectRatio } from "@utils";

import { styles as baseStyles, MAX_DROPDOWN_HEIGHT } from "./Select.style";

/* Models */

/**
 * Style props.
 */
type SelectStyleProps = StyleProps<typeof baseStyles>;

/**
 * SelectData type.
 */
type SelectData = string | number;

/**
 * Select props.
 */
type SelectProps<T extends SelectData> = {
  data: T[];
  value?: T;
  label?: string;
  placeholder?: string;
  style?: SelectStyleProps;
  testID?: string;
  onSelect?: (item: T) => void;
};

/**
 * DropDown settings.
 */
type DropDownSettings = {
  isVisible: boolean;
  position: {
    top: number;
    left: number;
  };
};

/**
 * Select
 */
function Select<T extends string | number>({
  data,
  value,
  label,
  placeholder = "Select...",
  style,
  testID,
  onSelect,
}: SelectProps<T>) {
  const [dropDownSettings, setDropDownSettings] = useState<DropDownSettings>({
    isVisible: false,
    position: {
      top: 0,
      left: 0,
    },
  });
  const [currentValue, setCurrentValue] = useState<T | undefined>(value);

  const selectRef = useRef<View>(null);

  const computedStyle = useComputeStyles<SelectStyleProps>(baseStyles, style);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={onSelectPressHandler}
        testID={testID || "select"}
      >
        <View style={computedStyle.select}>
          {label && (
            <Text style={computedStyle.label} testID="input-label">
              {label}
            </Text>
          )}
          <View
            style={computedStyle.inputSelect}
            ref={selectRef}
            testID={"select-input"}
          >
            <Text
              style={
                !currentValue
                  ? computedStyle.placeholder
                  : computedStyle.selectedItem
              }
            >
              {currentValue || placeholder}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {dropDownSettings.isVisible && (
        <Modal animationType={"fade"} transparent={true}>
          <Pressable
            onPress={onBackDropPressHandler}
            testID={"select-backdrop"}
            style={computedStyle.backdrop}
          >
            <ScrollView
              style={[
                computedStyle.dropDown,
                {
                  ...dropDownSettings.position,
                  width: (computedStyle?.select as typeof baseStyles.select)
                    ?.width,
                },
              ]}
              testID={"select-dropdown"}
            >
              {data.map((item, index) => (
                <TouchableOpacity
                  key={String(item) + index}
                  onPress={() => onDropDownItemPressHandler(item)}
                  testID={"select-dropdown-item"}
                >
                  <View style={computedStyle.dropDownItem}>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Modal>
      )}
    </>
  );

  /* Events */

  /**
   * On Select press handler.
   */
  function onSelectPressHandler() {
    selectRef.current?.measureInWindow((x, y, width, height) => {
      const maxHeight = aspectRatio("height", 100);

      let top = y + height;

      if (top + MAX_DROPDOWN_HEIGHT > maxHeight)
        top = maxHeight - MAX_DROPDOWN_HEIGHT;

      setDropDownSettings({
        isVisible: !dropDownSettings.isVisible,
        position: {
          top,
          left: x,
        },
      });
    });
  }

  /**
   * On backdrop press handler.
   */
  function onBackDropPressHandler() {
    setDropDownSettings({
      ...dropDownSettings,
      isVisible: false,
    });
  }

  /**
   * On dropdown item press handler.
   */
  function onDropDownItemPressHandler(selectValue: T) {
    setDropDownSettings({
      ...dropDownSettings,
      isVisible: false,
    });
    setCurrentValue(selectValue);

    onSelect?.(selectValue);
  }
}

/* Exports */
export { Select };
export type { SelectData };
