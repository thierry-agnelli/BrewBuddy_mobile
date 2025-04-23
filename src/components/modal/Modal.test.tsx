import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { View } from "react-native";

import { Modal } from "./Modal";

/**
 * Modal component tests.
 */

describe("Modal Component test", () => {
  it("Should be defiined", () => {
    expect(Modal).toBeDefined();
  });

  describe("Tests", () => {
    //Mocks
    const TestComponent = () => {
      return <View testID={"test-component"} />;
    };
    const mockedOnClose = jest.fn();

    it("Should render", () => {
      const { getByTestId } = render(
        <Modal
          isVisible={true}
          contentFactory={TestComponent}
          onClose={mockedOnClose}
        />,
      );

      const modal = getByTestId("modal");
      const closeButton = getByTestId("modal-close-button");
      const testComponent = getByTestId("test-component");

      expect(modal).toBeDefined();
      expect(closeButton).toBeDefined();
      expect(testComponent).toBeDefined();
    });

    it("Should render with no close button", () => {
      const { queryByTestId } = render(
        <Modal
          isVisible={false}
          contentFactory={TestComponent}
          onClose={mockedOnClose}
        />,
      );

      const closeButton = queryByTestId("modal-close-button");
      expect(closeButton).toBeNull();
    });

    it("Should call onCLose callback", () => {
      const { getByTestId } = render(
        <Modal
          isVisible={true}
          contentFactory={TestComponent}
          onClose={mockedOnClose}
        />,
      );
      const closeButton = getByTestId("modal-close-button");

      fireEvent.press(closeButton);

      expect(mockedOnClose).toBeCalled();
    });
  });
});
