import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { mocksNavigation, mocksRoute } from "@tests";
import { Routes, User } from "@models";
import * as useAppContextModule from "../../../hooks/appContext/useAppContext";
import { Profile } from "./Profile";
import { AppContextValues } from "@components";

/**
 * Profile view test.
 */
describe("Profile view test", () => {
  it("Should be defined", () => {
    expect(Profile).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    const mockedNavidation = mocksNavigation<Routes.PROFILE>();
    const mockedRoutes = mocksRoute<Routes.PROFILE>();

    const mockedUser: User = {
      pseudo: "test-user",
      email: "test@test.com",
      iat: 0,
      id: 1,
      role: 0,
      roleName: "USER",
    };

    jest
      .spyOn(useAppContextModule, "useAppContext")
      .mockReturnValue({ user: mockedUser } as AppContextValues);

    it("Should render", () => {
      const { getByTestId, getByText, queryByText } = render(
        <Profile navigation={mockedNavidation} route={mockedRoutes} />,
      );

      const profile = getByTestId("profile");
      const pseudo = getByText("Test-user");
      const email = getByText("Email: test@test.com");
      const role = queryByText("USER");

      expect(profile).toBeDefined();
      expect(pseudo).toBeDefined();
      expect(email).toBeDefined();
      expect(role).toBeNull();
    });

    it("Should display role upper than user", () => {
      // Mocks
      const mockedPremiumUser: User = {
        pseudo: "test-user",
        email: "test@test.com",
        iat: 0,
        id: 1,
        role: 1,
        roleName: "PREMIUM",
      };

      jest
        .spyOn(useAppContextModule, "useAppContext")
        .mockReturnValueOnce({ user: mockedPremiumUser } as AppContextValues);

      const { getByText } = render(
        <Profile navigation={mockedNavidation} route={mockedRoutes} />,
      );

      const role = getByText("Premium");
      expect(role).toBeDefined();
    });

    it("Should display and close modals", async () => {
      const { getByTestId, getAllByTestId, queryByTestId } = render(
        <Profile navigation={mockedNavidation} route={mockedRoutes} />,
      );

      const resetPasswordButton = getByTestId("reset-password-modal-button");
      const updateProfileButton = getByTestId("update-profile-modal-button");
      const deleteAccountButton = getByTestId("delete-account-modal-button");

      await act(async () => {
        fireEvent.press(resetPasswordButton);
        fireEvent.press(updateProfileButton);
        fireEvent.press(deleteAccountButton);
      });

      await waitFor(() => {
        const modals = getAllByTestId("modal");
        expect(modals).toHaveLength(3);
      });

      const modalsCloseButton = getAllByTestId("modal-close-button");
      const deleteAccountCancelButton = getByTestId("cancel-button");

      await act(async () => {
        fireEvent.press(modalsCloseButton[0]);
        fireEvent.press(modalsCloseButton[1]);
        fireEvent.press(deleteAccountCancelButton);
      });

      await waitFor(() => {
        const modals = queryByTestId("modal");
        expect(modals).toBeNull();
      });
    });
  });
});
