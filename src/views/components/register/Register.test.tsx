import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { mocksNavigation, mocksRoute } from "@tests";
import { Register } from "./Register";
import { Routes, StyleProps } from "@models";
import * as registerModule from "../../../services/users/register.ts";

/**
 *  Register view test.
 */

describe("Register view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Register).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.REGISTER>();
    const mockedRoute = mocksRoute<Routes.REGISTER>();
    it("Should render", () => {
      const { getByTestId } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );

      expect(getByTestId("register-title")).toBeDefined();
    });

    it("Should navigate to login view", async () => {
      const { getByTestId } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("login-button");

      await act(() => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(
          Routes.LOGIN,
          {},
        );
      });
    });

    it("Should navigate to terms of use view", async () => {
      const { getByTestId } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("terms-of-use-button");

      await act(() => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(
          Routes.TERMS_OF_USE,
          {},
        );
      });
    });

    it("Should handle change fields value", async () => {
      const mockFormRef = {};
      const useRefSpy = jest.spyOn(React, "useRef");
      // TODO : Find a better way.
      // Had to mock twice to compensate Component life cycle
      useRefSpy.mockReturnValueOnce({
        current: mockFormRef,
      });
      useRefSpy.mockReturnValueOnce({
        current: mockFormRef,
      });

      const { getAllByTestId } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );

      const formInputs = getAllByTestId("form-input");

      await act(() => {
        fireEvent.changeText(formInputs[0], "test");
      });

      await waitFor(() => {
        expect(mockFormRef).toStrictEqual({
          username: "test",
        });
      });
    });

    it("Should set error on register fail", async () => {
      // Mock authenticate service
      jest
        .spyOn(registerModule, "register")
        .mockRejectedValueOnce("This a test error");

      const { getByTestId, getByPlaceholderText } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );

      const usernameInput = getByPlaceholderText(
        "Entrez votre nom d'utilisateur",
      );
      const mailInput = getByPlaceholderText("Entrez votre email");
      const pwdInput = getByPlaceholderText("Mot de passe");
      const confirmPwdInput = getByPlaceholderText(
        "Confirmation du mot de passe",
      );
      const cguCheckbox = getByTestId("cgu-checkbox");
      const button = getByTestId("register-button");

      await act(() => {
        fireEvent.changeText(usernameInput, "Username");
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "1-Azerty");
        fireEvent.changeText(confirmPwdInput, "1-Azerty");
        fireEvent.press(cguCheckbox);
      });

      await act(() => {
        fireEvent.press(button);
      });

      const errorElement = getByTestId("error-message");

      await waitFor(() =>
        expect(errorElement.props.children).toBe("This a test error"),
      );
    });

    it("Should display error style", async () => {
      const { getByTestId, getAllByTestId } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );
      const button = getByTestId("register-button");
      const required = getAllByTestId("input-required");
      const inputs = getAllByTestId("form-input");

      await act(() => {
        fireEvent.press(button);
      });

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

    it("Should register", async () => {
      // Mock register service
      const mockedRegisterService = jest
        .spyOn(registerModule, "register")
        .mockResolvedValue("");

      const { getByTestId, getByPlaceholderText } = render(
        <Register navigation={mockedNavigation} route={mockedRoute} />,
      );

      const usernameInput = getByPlaceholderText(
        "Entrez votre nom d'utilisateur",
      );
      const mailInput = getByPlaceholderText("Entrez votre email");
      const pwdInput = getByPlaceholderText("Mot de passe");
      const confirmPwdInput = getByPlaceholderText(
        "Confirmation du mot de passe",
      );
      const cguCheckbox = getByTestId("cgu-checkbox");
      const button = getByTestId("register-button");

      mockedRegisterService.mockResolvedValueOnce("Success");

      // Fill form
      await act(() => {
        fireEvent.changeText(usernameInput, "Username");
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "1-Azerty");
        fireEvent.changeText(confirmPwdInput, "1-Azerty");
        fireEvent.press(cguCheckbox);
      });

      // Send form
      await act(async () => {
        fireEvent.press(button);
      });

      // Successful registrations elements to be displayed.
      const successfulLRegistrationBtn = getByTestId(
        "successful-registration-btn",
      );

      await waitFor(() => {
        expect(successfulLRegistrationBtn).toBeDefined();
      });

      // Navigate to login view.
      await act(() => {
        fireEvent.press(successfulLRegistrationBtn);
      });

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(
          Routes.LOGIN,
          {},
        );
      });
    });
  });
});
