import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { mockedNavigation } from "@tests";
import { TermsOfUse } from "./TermsOfUse.tsx";

/**
 *  TermsOfUse view test.
 */
describe("TermsOfUse view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(TermsOfUse).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(
        <TermsOfUse navigation={mockedNavigation} />,
      );

      const terms = getByTestId("terms");

      expect(terms).toBeDefined();
    });
  });
});
