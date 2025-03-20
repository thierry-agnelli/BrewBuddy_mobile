import { describe, expect, it, jest } from "@jest/globals";
import { renderHook } from "@testing-library/react-native";

import { useAppContext } from "@hooks";
import React from "react";

/**
 * useAppContext hook test.
 */

describe("useAppContext hook test", () => {
  it("Should be defined", () => {
    expect(useAppContext).toBeDefined();
  });

  describe("Tests", () => {
    it("Should return AppContext", () => {
      // Mocks
      const mockedContext = {
        authToken: null,
        setAuthToken: expect.any(Function),
        navigationHistory: [],
        goBackNavigation: expect.any(Function),
      };
      const useContextSpy = jest.spyOn(React, "useContext");
      useContextSpy.mockReturnValue(mockedContext);

      const { result } = renderHook(useAppContext);

      expect(result.current).toStrictEqual(mockedContext);
    });
  });
});
