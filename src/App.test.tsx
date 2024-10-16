import "react-native";
import { jest, describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";

import App from "./App";

/* Mocks */

jest.mock("@router/Router.tsx", () => {
  // Mock are done in first before import.
  // Have to use require to import during mocking phase.
  //eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require("react-native");
  return {
    Router: () => <View />,
  };
});

/**
 *  App component test.
 */

describe("App test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(App).toBeDefined();
  });

  // Component tests
  describe("Component tests", () => {
    it("Renders correctly", () => {
      render(<App />);
    });
  });
});
