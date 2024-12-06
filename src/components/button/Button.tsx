import { useEffect, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { Text } from "../text/Text";
import { useComputeStyles } from "@hooks";
import { StyleProps } from "@models";
import { styles as baseStyles } from "./Button.style";

/* Const */
const BASE_DURATION = 1000;

/* Models */
type ButtonStyleProps = StyleProps<typeof baseStyles>;

type ButtonProps = {
  title?: string;
  icon?: ImageSourcePropType;
  style?: ButtonStyleProps | ButtonStyleProps[];
  testID?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  animationSpeed?: number;
};

/**
 * Custom Button.
 */
function Button(props: ButtonProps) {
  const {
    title,
    icon,
    style,
    testID = "pressable-button",
    onPress,
    disabled = false,
    animationSpeed,
  } = props;

  /* Refs */
  const rotateValue = useRef<Animated.Value>(new Animated.Value(0));

  /* Hooks */
  useEffect(() => {
    const animateRotation = Animated.loop(
      Animated.timing(rotateValue.current, {
        toValue: 1,
        duration:
          animationSpeed && animationSpeed > 0
            ? BASE_DURATION / animationSpeed
            : 0,
        useNativeDriver: true,
      }),
    );
    animateRotation.start();

    return () => animateRotation.stop();
  }, [rotateValue, animationSpeed]);

  const computedStyle = useComputeStyles<ButtonStyleProps>(baseStyles, style);

  // Compute rotation
  const rotateInterpolate = rotateValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      style={[
        computedStyle.button,
        disabled ? computedStyle.disabled : computedStyle.enabled,
      ]}
      onPress={onPress}
      testID={testID}
      disabled={disabled}
    >
      {icon && (
        <Animated.View
          style={[
            computedStyle.iconBox,
            {
              transform: [
                {
                  rotate: rotateInterpolate,
                },
              ],
            },
          ]}
        >
          <Image
            source={icon}
            style={computedStyle.icon}
            testID="button-icon"
          />
        </Animated.View>
      )}
      {title && (
        <Text style={computedStyle.title} testID="button-title">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

/* Exports */
export { Button };
