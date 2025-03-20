import { describe, expect, it, jest } from "@jest/globals";
import { renderHook } from "@testing-library/react-native";

import * as jwtDecodeModule from "jwt-decode";

import { useAuthentication } from "./useAuthentication";
import * as useAppContextModule from "../appContext/useAppContext";
import { AppContextValues } from "@components";
import { UserRoles } from "@models";

/**
 * useAuthentication hook test.
 */
describe("useAppContext hook test", () => {
  it("Should be defined", () => {
    expect(useAuthentication).toBeDefined();
  });

  describe("Tests", () => {
    it("Should unauthenticated value", () => {
      jest.spyOn(useAppContextModule, "useAppContext").mockReturnValueOnce({
        authToken: null,
        setAuthToken: jest.fn(),
        navigationHistory: [],
        goBackNavigation: jest.fn(),
      } as AppContextValues);

      const { result } = renderHook(useAuthentication);

      expect(result.current).toStrictEqual({
        email: "",
        iat: 0,
        id: 0,
        pseudo: "",
        role: UserRoles.USER,
        isAuthenticated: false,
      });
    });

    it("Should authenticated value", () => {
      jest.spyOn(useAppContextModule, "useAppContext").mockReturnValueOnce({
        authToken: "not null",
        setAuthToken: jest.fn(),
        navigationHistory: [],
        goBackNavigation: jest.fn(),
      } as AppContextValues);

      jest.spyOn(jwtDecodeModule, "jwtDecode").mockReturnValueOnce({
        email: "gege@mock.com",
        iat: 1234,
        id: 1,
        pseudo: "Gege",
        role: "USER",
      });

      const { result } = renderHook(useAuthentication);

      expect(result.current).toStrictEqual({
        email: "gege@mock.com",
        iat: 1234,
        id: 1,
        pseudo: "Gege",
        role: UserRoles.USER,
        isAuthenticated: true,
      });
    });
  });
});
