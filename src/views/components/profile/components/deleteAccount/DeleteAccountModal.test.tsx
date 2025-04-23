import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { mocksNavigation } from "@tests";
import * as deleteUserModule from "../../../../../services/users/deleteUser";

import { DeleteAccountModal } from "./DeleteAccountModal";
import { Routes, UserRoles } from "@models";
import { useAppContext } from "@hooks";
import { AppContextValues } from "@components";

/**
 *  Delete account modal component test.
 */
describe("Delete account modal component test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(DeleteAccountModal).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.PROFILE>();

    it("Should render", () => {
      const { getByTestId } = render(
        <DeleteAccountModal
          isVisible={true}
          onClose={jest.fn()}
          navigation={mockedNavigation}
        />,
      );

      const modal = getByTestId("delete-account-modal");
      expect(modal).toBeDefined();
    });

    it("Should cancel and call close modal", () => {
      // Mocks
      const mockedOnclose = jest.fn();

      const { getByTestId } = render(
        <DeleteAccountModal
          isVisible={true}
          onClose={mockedOnclose}
          navigation={mockedNavigation}
        />,
      );

      const cancelButton = getByTestId("cancel-button");
      fireEvent.press(cancelButton);

      expect(mockedOnclose).toHaveBeenCalled();
    });

    it("Should delete profile", async () => {
      // Mocks
      const deleteUserSpy = jest
        .spyOn(deleteUserModule, "deleteUser")
        .mockResolvedValueOnce("Deleted");
      const mockedOnclose = jest.fn();

      let context: AppContextValues;

      const TestComponent = () => {
        context = useAppContext();
        context.setAuthToken = jest.fn();

        return (
          <DeleteAccountModal
            isVisible={true}
            onClose={mockedOnclose}
            navigation={mockedNavigation}
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const deleteButton = getByTestId("delete-button");

      await act(async () => {
        fireEvent.press(deleteButton);
      });

      const closeButton = getByTestId("close-button");

      await act(async () => {
        fireEvent.press(closeButton);
      });

      await waitFor(() => {
        expect(deleteUserSpy).toHaveBeenCalledWith(0, undefined);
        expect(context.user).toStrictEqual({
          id: 0,
          email: "",
          pseudo: "",
          role: UserRoles.USER,
          roleName: UserRoles[UserRoles.USER] as keyof typeof UserRoles,
          iat: 0,
        });
        expect(context.setAuthToken).toHaveBeenCalledWith(null);
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(
          Routes.LOGIN,
          {},
        );
        expect(mockedOnclose).toHaveBeenCalled();
      });
    });

    it("Should handle request error", async () => {
      jest
        .spyOn(deleteUserModule, "deleteUser")
        .mockRejectedValueOnce("Test error");

      const { getByTestId } = render(
        <DeleteAccountModal
          isVisible={true}
          onClose={jest.fn()}
          navigation={mockedNavigation}
        />,
      );
      const updateButton = getByTestId("delete-button");
      const errorMessage = getByTestId("error-message");

      await act(async () => {
        fireEvent.press(updateButton);
      });

      await waitFor(() => {
        expect(errorMessage.props.children).toBe("Test error");
      });
    });
  });
});
