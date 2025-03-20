import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

import { useAppContext } from "@hooks";

import { AppContextProvider } from "@components";
import { Button, Text, View } from "react-native";

import { mockedNavigation } from "@tests";
// eslint-disable-next-line max-len
import * as goBackNavigationModule from "./utils/navigation/goBackNavigation.ts";

/**
 * AppContextProvider component test.
 */

describe("AppContext component text", () => {
  it("Should be defined", () => {
    expect(AppContextProvider).toBeDefined();
  });

  describe("Tests", () => {
    function TestComponent() {
      const { authToken, setAuthToken, goBackNavigation } = useAppContext();

      return (
        <View>
          <Text testID="logged-status">
            {authToken ? "Logged in" : "Logged out"}
          </Text>
          <Button
            title="test-button"
            onPress={() => setAuthToken("authToken")}
            testID="test-button"
          />
          <Button
            title={"go-back"}
            onPress={() => goBackNavigation(mockedNavigation)}
            testID="goBack-button"
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

    it("Should provide goBack function", () => {
      const goBackSpy = jest.spyOn(goBackNavigationModule, "goBackNavigation");

      const { getByTestId } = render(
        <AppContextProvider>
          <TestComponent />
        </AppContextProvider>,
      );

      const goBackButton = getByTestId("goBack-button");
      fireEvent.press(goBackButton);

      expect(goBackSpy).toHaveBeenCalled();
    });
  });
});
