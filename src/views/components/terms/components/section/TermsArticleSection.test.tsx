import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { TermsArticleSection } from "./TermsArticleSection.tsx";

/**
 *  TermsArticleSection view test.
 */

describe("TermsArticleSection view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(TermsArticleSection).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render with title", () => {
      const { getByTestId, getByText } = render(
        <TermsArticleSection title={"test-terms"} titleIndex={1}>
          {"Section"}
        </TermsArticleSection>,
      );

      const title = getByText("1. test-terms");
      const child = getByTestId("section-content");

      expect(title).toBeDefined();
      expect(child).toBeDefined();
    });

    it("Should render without title", () => {
      const { queryByTestId, getByTestId } = render(
        <TermsArticleSection titleIndex={1}>{"Section"}</TermsArticleSection>,
      );

      const title = queryByTestId("section-title");
      const child = getByTestId("section-content");

      expect(title).toBe(null);
      expect(child).toBeDefined();
    });
  });
});
