import React from "react";
import { Text } from "react-native";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { TermsArticle } from "./TermsArticle.tsx";

/**
 *  TermsArticle view test.
 */

describe("TermsArticle view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(TermsArticle).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(
        <TermsArticle title={"test-terms"}>
          <Text testID={"test-child"}>Article</Text>
        </TermsArticle>,
      );

      const title = getByTestId("article-title");
      const child = getByTestId("test-child");

      expect(title).toBeDefined();
      expect(child).toBeDefined();
    });
  });
});
