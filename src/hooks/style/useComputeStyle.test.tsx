import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { useComputeStyles } from "./useComputeStyles";
import { StyleProps } from "@models";
/**
 * useComputeStyle hook test.
 */

describe("useComputeStyle hook test", () => {
  it("Should be defined", () => {
    expect(useComputeStyles).toBeDefined();
  });

  describe("Tests", () => {
    const mockedStyle = StyleSheet.create({
      firstProp: {
        fontSize: 15,
      },
      secondProp: {
        color: "purple",
      },
    });
    type StyleTest = StyleProps<typeof mockedStyle>;

    it("Should merge style", () => {
      const { result } = renderHook(() =>
        useComputeStyles<StyleTest>(mockedStyle),
      );

      expect(result.current).toStrictEqual({
        firstProp: {
          fontSize: 15,
        },
        secondProp: {
          color: "purple",
        },
      });
    });

    it("Should merge style with custom style", () => {
      const mockedCustomStyle = StyleSheet.create({
        firstProp: {
          fontWeight: "bold",
        },
      });
      const { result } = renderHook(() =>
        useComputeStyles<StyleTest>(mockedStyle, mockedCustomStyle),
      );

      expect(result.current).toStrictEqual({
        firstProp: {
          fontSize: 15,
          fontWeight: "bold",
        },
        secondProp: {
          color: "purple",
        },
      });
    });

    it("Should merge style with multiple custom style", () => {
      const mockedCustomStyle = {
        firstProp: {
          fontWeight: "bold",
        },
      };
      const mockedAnotherCustomStyle = {
        secondProp: {
          borderWidth: 3,
        },
      };
      const { result } = renderHook(() =>
        useComputeStyles<StyleTest>(mockedStyle, [
          mockedCustomStyle,
          mockedAnotherCustomStyle,
        ]),
      );

      expect(result.current).toStrictEqual({
        firstProp: {
          fontSize: 15,
          fontWeight: "bold",
        },
        secondProp: {
          color: "purple",
          borderWidth: 3,
        },
      });
    });
  });
});
