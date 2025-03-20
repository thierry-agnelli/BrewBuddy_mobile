import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { AppContextProvider } from "@components";
import { mockedNavigation } from "@tests";
import { Terms } from "./Terms.tsx";
// eslint-disable-next-line max-len
import * as goBackNavigationModule from "../../../../components/appContext/utils/navigation/goBackNavigation";

/**
 *  Terms view test.
 */
describe("Terms view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Terms).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(
        <Terms navigation={mockedNavigation} term={"use"} />,
      );

      const terms = getByTestId("terms");

      expect(terms).toBeDefined();
    });

    it("Should call goBack function", async () => {
      const goBackSpy = jest.spyOn(goBackNavigationModule, "goBackNavigation");

      const { getByTestId } = render(
        <AppContextProvider>
          <Terms navigation={mockedNavigation} term={"use"} />
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
