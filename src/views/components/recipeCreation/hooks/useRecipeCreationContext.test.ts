import { describe, expect, it, jest } from "@jest/globals";
import { renderHook } from "@testing-library/react-native";
import React from "react";
import { useRecipeCreationContext } from "./useRecipeCreationContext";

/**
 * useRecipeCreationContext hook test.
 */

describe("useRecipeCreationContext hook test", () => {
  it("Should be defined", () => {
    expect(useRecipeCreationContext).toBeDefined();
  });

  describe("Tests", () => {
    it("Should return AppContext", () => {
      // Mocks
      const mockedContext = {
        step: 0,
        setStep: jest.fn(),
      };
      const useContextSpy = jest.spyOn(React, "useContext");
      useContextSpy.mockReturnValue(mockedContext);

      const { result } = renderHook(() => useRecipeCreationContext());

      expect(result.current).toStrictEqual(mockedContext);
    });
  });
});
