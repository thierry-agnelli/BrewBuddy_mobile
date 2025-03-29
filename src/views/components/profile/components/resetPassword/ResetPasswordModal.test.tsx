import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { ResetPasswordModal } from "./ResetPasswordModal";

/**
 * Reset password modal component test.
 */
describe("Reset password modal component test", () => {
  it("Should be defined", () => {
    expect(ResetPasswordModal).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(
        <ResetPasswordModal isVisible={true} onClose={jest.fn()} />,
      );

      const modal = getByTestId("reset-password-modal");
      expect(modal).toBeDefined();
    });

    it("Should reset password", async () => {
      const mockedOnClose = jest.fn();
      const { getByTestId } = render(
        <ResetPasswordModal isVisible={true} onClose={mockedOnClose} />,
      );

      const resetButton = getByTestId("reset-button");

      await act(() => {
        fireEvent.press(resetButton);
      });

      const closeButton = getByTestId("close-modal-button");

      await act(() => {
        fireEvent.press(closeButton);
      });

      await waitFor(() => {
        expect(mockedOnClose).toHaveBeenCalled();
      });
    });
  });
});
