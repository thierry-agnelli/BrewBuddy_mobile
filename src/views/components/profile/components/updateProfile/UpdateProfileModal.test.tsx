import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import * as updateUserModule from "../../../../../services/users/updateUser";

import { UpdateProfileModal } from "./UpdateProfileModal";
import { UserModel } from "@models";

/**
 *  Update profile modal component test.
 */
describe("Update profile modal component test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(UpdateProfileModal).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(
        <UpdateProfileModal isVisible={true} onClose={jest.fn()} />,
      );

      const modal = getByTestId("update-profile-modal");
      expect(modal).toBeDefined();
    });

    it("Should update profile", async () => {
      const updateUserSpy = jest
        .spyOn(updateUserModule, "updateUser")
        .mockResolvedValueOnce({} as UserModel);
      const mockedOnclose = jest.fn();
      const { getByTestId } = render(
        <UpdateProfileModal isVisible={true} onClose={mockedOnclose} />,
      );
      const emailInput = getByTestId("email-input");
      const pseudoInput = getByTestId("pseudo-input");
      const updateButton = getByTestId("update-button");

      await act(async () => {
        fireEvent.changeText(emailInput, "test@test.com");
        fireEvent.changeText(pseudoInput, "pseudo");

        fireEvent.press(updateButton);
      });

      await waitFor(() => {
        expect(updateUserSpy).toHaveBeenCalledWith(
          0,
          {
            email: "test@test.com",
            pseudo: "pseudo",
          },
          undefined,
        );
        expect(mockedOnclose).toHaveBeenCalled();
      });
    });

    it("Should handle request error", async () => {
      jest
        .spyOn(updateUserModule, "updateUser")
        .mockRejectedValueOnce("Test error");

      const { getByTestId } = render(
        <UpdateProfileModal isVisible={true} onClose={jest.fn()} />,
      );
      const updateButton = getByTestId("update-button");
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
