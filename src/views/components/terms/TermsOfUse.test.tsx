import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { TermsOfUse } from "./TermsOfUse.tsx";
import { mocksNavigation, mocksRoute } from "@tests";
import { Routes } from "@models";

/**
 *  TermsOfUse view test.
 */
describe("TermsOfUse view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(TermsOfUse).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.TERMS_OF_USE>();
    const mockedRoute = mocksRoute<Routes.TERMS_OF_USE>();

    it("Should render", () => {
      const { getByTestId } = render(
        <TermsOfUse navigation={mockedNavigation} route={mockedRoute} />,
      );

      const terms = getByTestId("terms");

      expect(terms).toBeDefined();
    });
  });
});
