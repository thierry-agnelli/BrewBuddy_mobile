import React from "react";

import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
import { Login } from "./Login";

import * as authModule from "../../../services/users/authenticate.ts";
import { Routes, StyleProps } from "@models";
import { mockedGetItem, mockedSetItem } from "@tests";

/**
 *  Login view test.
 */

describe("Login view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Login).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Login navigation={mockedNavigation} />);

      expect(getByTestId("login-title")).toBeDefined();
    });

    it("Should navigate to register view", () => {
      const { getByTestId } = render(<Login navigation={mockedNavigation} />);

      const button = getByTestId("register-button");

      fireEvent.press(button);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.REGISTER);
    });

    // it("Should handle change fields value", () => {
    //   const mockFormRef = {};
    //   const useRefSpy = jest.spyOn(React, "useRef");
    //   // TODO : Find a better way.&
    //   // Had to mock twice to compensate Component life cycle
    //   useRefSpy.mockReturnValueOnce({
    //     current: mockFormRef,
    //   });
    //   useRefSpy.mockReturnValueOnce({
    //     current: mockFormRef,
    //   });
    //
    //   const { getAllByTestId } = render(
    //     <Login navigation={mockedNavigation} />,
    //   );
    //   const formInputs = getAllByTestId("form-input");
    //
    //   fireEvent.changeText(formInputs[0], "test");
    //
    //   expect(mockFormRef).toStrictEqual({
    //     mail: "test",
    //   });
    // });

    it("Should set error on login fail", async () => {
      // Mock authenticate service
      jest
        .spyOn(authModule, "authenticate")
        .mockRejectedValueOnce("This a test error");

      const { getByTestId, getByPlaceholderText } = render(
        <Login navigation={mockedNavigation} />,
      );

      const mailInput = getByPlaceholderText("Entrez votre email");
      const pwdInput = getByPlaceholderText("Mot de passe");
      const button = getByTestId("login-button");

      act(() => {
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "password");

        fireEvent.press(button);
      });

      const errorElement = getByTestId("error-message");

      await waitFor(() =>
        expect(errorElement.props.children).toBe("This a test error"),
      );
    });

    it("Should display error style", () => {
      const { getByTestId, getAllByTestId } = render(
        <Login navigation={mockedNavigation} />,
      );
      const button = getByTestId("login-button");
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

    it("Should login", async () => {
      // Mock authenticate service
      const mockedAuthenticateService = jest
        .spyOn(authModule, "authenticate")
        .mockResolvedValue("");

      const { getByTestId, getByPlaceholderText } = render(
        <Login navigation={mockedNavigation} />,
      );

      const mailInput = getByPlaceholderText("Entrez votre email");
      const pwdInput = getByPlaceholderText("Mot de passe");
      const rememberMe = getByTestId("remember-me");
      const button = getByTestId("login-button");

      mockedAuthenticateService.mockResolvedValueOnce("authToken");

      // Fill form
      act(() => {
        fireEvent.changeText(mailInput, "test@mail.mock");
        fireEvent.changeText(pwdInput, "password");
      });

      // Send form
      await act(async () => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedSetItem).not.toHaveBeenCalled();

        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.HOME);
      });

      act(() => {
        fireEvent.press(rememberMe);

        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedSetItem).toHaveBeenCalledWith("authToken", "");
      });
    });

    it("Should redirect to home if auth token exist in storage", async () => {
      mockedGetItem.mockResolvedValueOnce("authToken");

      render(<Login navigation={mockedNavigation} />);

      await waitFor(() =>
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.HOME),
      );
    });
  });
});
