import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
import { TermsOfSale } from "./TermsOfSale.tsx";

/**
 *  TermsOfSale view test.
 */
describe("TermsOfSale view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(TermsOfSale).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(
        <TermsOfSale navigation={mockedNavigation} />,
      );

      const terms = getByTestId("terms");

      expect(terms).toBeDefined();
    });
  });
});
