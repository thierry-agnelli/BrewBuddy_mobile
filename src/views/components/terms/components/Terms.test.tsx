import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { AppContextProvider } from "@components";
import { Terms } from "./Terms.tsx";
// eslint-disable-next-line max-len
import * as goBackNavigationModule from "../../../../components/appContext/utils/navigation/goBackNavigation";
import { mocksNavigation, mocksRoute } from "@tests";
import { Routes } from "@models";

/**
 *  Terms view test.
 */
describe("Terms view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Terms).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<
      Routes.TERMS_OF_USE | Routes.TERMS_OF_SALE
    >();
    const mockedRoute = mocksRoute<
      Routes.TERMS_OF_USE | Routes.TERMS_OF_SALE
    >();

    it("Should render", () => {
      const { getByTestId } = render(
        <Terms
          navigation={mockedNavigation}
          term={"use"}
          route={mockedRoute}
        />,
      );

      const terms = getByTestId("terms");

      expect(terms).toBeDefined();
    });

    it("Should call goBack function", async () => {
      const goBackSpy = jest.spyOn(goBackNavigationModule, "goBackNavigation");

      const { getByTestId } = render(
        <AppContextProvider>
          <Terms
            navigation={mockedNavigation}
            term={"use"}
            route={mockedRoute}
          />
        </AppContextProvider>,
      );

      const goBackButton = getByTestId("goBack-button");

      await act(() => {
        fireEvent.press(goBackButton);
      });

      await waitFor(() => {
        expect(goBackSpy).toHaveBeenCalled();
      });
    });
  });
});
