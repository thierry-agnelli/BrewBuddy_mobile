import { describe, expect, it } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

import { useAppContext } from "@hooks";

import { AppContextProvider } from "@components";
import { Button, Text, View } from "react-native";

/**
 * AppContextProvider component test.
 */

describe("AppContext component text", () => {
  it("Should be defined", () => {
    expect(AppContextProvider).toBeDefined();
  });

  describe("Tests", () => {
    function TestComponent() {
      const { authToken, setAuthToken } = useAppContext();

      return (
        <View>
          <Text testID="logged-status">
            {authToken ? "Logged in" : "Logged out"}
          </Text>
          <Button
            title="test-button"
            onPress={() => setAuthToken("authTOken")}
            testID="test-button"
          />
        </View>
      );
    }

    it("Should provide the correct initial value", () => {
      const { getByTestId } = render(
        <AppContextProvider>
          <TestComponent />
        </AppContextProvider>,
      );

      const statusElement = getByTestId("logged-status");

      expect(statusElement.props.children).toStrictEqual("Logged out");
    });

    it("Should update the context value when setLogged is called", () => {
      const { getByTestId } = render(
        <AppContextProvider>
          <TestComponent />
        </AppContextProvider>,
      );

      const statusElement = getByTestId("logged-status");
      expect(statusElement.props.children).toBe("Logged out");

      const toggleButton = getByTestId("test-button");
      fireEvent.press(toggleButton);

      expect(statusElement.props.children).toBe("Logged in");
    });
  });
});
