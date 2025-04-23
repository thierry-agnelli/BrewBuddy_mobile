import React from "react";

import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login } from "./Login";

import * as authModule from "../../../services/users/authenticate.ts";
// eslint-disable-next-line max-len
import * as useAppContextModule from "../../../hooks/appContext/useAppContext.ts";
import { Routes, StyleProps } from "@models";
import {
  mockedGetItem,
  mockedSetItem,
  mocksNavigation,
  mocksRoute,
} from "@tests";
import { AppContextValues } from "@components";

/**
 *  Login view test.
 */

describe("Login view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Login).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    jest.spyOn(useAppContextModule, "useAppContext").mockReturnValue({
      setAuthToken: jest.fn(),
    } as unknown as AppContextValues);

    const mockedNavigation = mocksNavigation<Routes.LOGIN>();
    const mockedRoute = mocksRoute<Routes.LOGIN>();

    it("Should render", () => {
      const { getByTestId } = render(
        <Login navigation={mockedNavigation} route={mockedRoute} />,
      );

      expect(getByTestId("login-title")).toBeDefined();
    });

    it("Should navigate to register view", async () => {
      const { getByTestId } = render(
        <Login navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("register-button");

      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(
          Routes.REGISTER,
          {},
        );
      });
    });

    it("Should set error on login fail", async () => {
      // Mock authenticate service
      jest
        .spyOn(authModule, "authenticate")
        .mockRejectedValueOnce("This a test error");

      const { getByTestId, getByPlaceholderText } = render(
        <Login navigation={mockedNavigation} route={mockedRoute} />,
      );

      const mailInput = getByPlaceholderText("Entrez votre email");
      const pwdInput = getByPlaceholderText("Mot de passe");
      const button = getByTestId("login-button");

      await act(() => {
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "password");
        fireEvent.press(button);
      });

      const errorElement = getByTestId("error-message");

      await waitFor(() =>
        expect(errorElement.props.children).toBe("This a test error"),
      );
    });

    it("Should display error style", async () => {
      const { getByTestId, getAllByTestId } = render(
        <Login navigation={mockedNavigation} route={mockedRoute} />,
      );
      const button = getByTestId("login-button");
      const required = getAllByTestId("input-required");
      const inputs = getAllByTestId("form-input");

      // await act(() => {
      fireEvent.press(button);
      // });

      await waitFor(() => {
        for (const requireElement of required) {
          expect(requireElement.props.style.color).toBe("#E74C3C");
        }

        for (const input of inputs) {
          expect(
            input.props.style.find(
              // Need to use any to asser backGroundColor
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (style: StyleProps<any>) =>
                style.borderColor && !style.backgroundColor,
            ).borderColor,
          ).toBe("#E74C3C");
        }
      });
    });

    it("Should login", async () => {
      // Mock authenticate service
      const mockedAuthenticateService = jest
        .spyOn(authModule, "authenticate")
        .mockResolvedValue("");

      const { getByTestId, getByPlaceholderText } = render(
        <Login navigation={mockedNavigation} route={mockedRoute} />,
      );

      const mailInput = getByPlaceholderText("Entrez votre email");
      const pwdInput = getByPlaceholderText("Mot de passe");
      const rememberMe = getByTestId("remember-me");
      const button = getByTestId("login-button");

      mockedAuthenticateService.mockResolvedValueOnce("authToken");

      // Fill form
      await act(() => {
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "password");
      });

      // Send form
      await act(async () => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedSetItem).not.toHaveBeenCalled();

        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.HOME, {});
      });

      await act(() => {
        fireEvent.press(rememberMe);
      });

      await act(() => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedSetItem).toHaveBeenCalledWith("authToken", "");
      });
    });

    it("Should redirect to home if auth token exist in storage", async () => {
      mockedGetItem.mockResolvedValueOnce("authToken");

      render(<Login navigation={mockedNavigation} route={mockedRoute} />);

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.HOME, {});
      });
    });
  });
});
