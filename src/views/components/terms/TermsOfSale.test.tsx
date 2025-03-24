import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { mocksNavigation, mocksRoute } from "@tests";
import { TermsOfSale } from "./TermsOfSale.tsx";
import { Routes } from "@models";

/**
 *  TermsOfSale view test.
 */
describe("TermsOfSale view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(TermsOfSale).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.TERMS_OF_SALE>();
    const mockedRoute = mocksRoute<Routes.TERMS_OF_SALE>();
    it("Should render", () => {
      const { getByTestId } = render(
        <TermsOfSale navigation={mockedNavigation} route={mockedRoute} />,
      );

      const terms = getByTestId("terms");

      expect(terms).toBeDefined();
    });
  });
});
