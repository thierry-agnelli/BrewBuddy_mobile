import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
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
    it("Should render", () => {
      const { getByTestId } = render(
        <Register navigation={mockedNavigation} />,
      );

      expect(getByTestId("register-title")).toBeDefined();
    });

    it("Should navigate to login view", () => {
      const { getByTestId } = render(
        <Register navigation={mockedNavigation} />,
      );

      const button = getByTestId("login-button");

      fireEvent.press(button);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.LOGIN);
    });

    it("Should handle change fields value", () => {
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
        <Register navigation={mockedNavigation} />,
      );

      const formInputs = getAllByTestId("form-input");

      fireEvent.changeText(formInputs[0], "test");

      expect(mockFormRef).toStrictEqual({
        username: "test",
      });
    });

    it("Should set error on register fail", async () => {
      // Mock authenticate service
      jest
        .spyOn(registerModule, "register")
        .mockRejectedValueOnce("This a test error");

      const { getByTestId, getByPlaceholderText } = render(
        <Register navigation={mockedNavigation} />,
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

      act(() => {
        fireEvent.changeText(usernameInput, "Username");
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "1-Azerty");
        fireEvent.changeText(confirmPwdInput, "1-Azerty");
        fireEvent.press(cguCheckbox);

        fireEvent.press(button);
      });

      const errorElement = getByTestId("error-message");

      await waitFor(() =>
        expect(errorElement.props.children).toBe("This a test error"),
      );
    });

    it("Should display error style", () => {
      const { getByTestId, getAllByTestId } = render(
        <Register navigation={mockedNavigation} />,
      );
      const button = getByTestId("register-button");
      const required = getAllByTestId("input-required");
      const inputs = getAllByTestId("form-input");

      act(() => {
        fireEvent.press(button);
      });

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

    it("Should register", async () => {
      // Mock register service
      const mockedRegisterService = jest
        .spyOn(registerModule, "register")
        .mockResolvedValue("");

      const { getByTestId, getByPlaceholderText } = render(
        <Register navigation={mockedNavigation} />,
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
      expect(successfulLRegistrationBtn).toBeDefined();

      // Navigate to login view.
      await act(() => {
        fireEvent.press(successfulLRegistrationBtn);
      });

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.LOGIN);
      });
    });
  });
});
