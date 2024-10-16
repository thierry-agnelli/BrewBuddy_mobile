import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { View, Text } from "react-native";

import { ViewWrapper } from "./ViewWrapper";

/**
 *  ViewWrapper Component test.
 */

describe("ViewWrapper component tests", () => {
  // Should be defined
  it("Shoukld be defined", () => {
    expect(ViewWrapper).toBeDefined();
  });

  // Component tests
  describe("Component tests", () => {
    it("Should render", () => {
      const TestComponent = () => {
        return (
          <View>
            <Text>Test Component</Text>
          </View>
        );
      };

      const { getByText } = render(
        <ViewWrapper>
          <TestComponent />
        </ViewWrapper>,
      );

      expect(getByText("Test Component")).toBeTruthy();
    });
  });
});
