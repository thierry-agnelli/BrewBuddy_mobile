import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react-native";

import { useAppContext } from "./useAppContext";

/**
 * useAppContext hook test.
 */

describe("useAppContext hook test", () => {
  it("Should be defined", () => {
    expect(useAppContext).toBeDefined();
  });

  describe("Tests", () => {
    it("Should return AppContext", () => {
      const { result } = renderHook(useAppContext);

      expect(result.current).toStrictEqual({
        authToken: null,
        setAuthToken: expect.any(Function),
      });
    });
  });
});
