import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { Text } from "./Text";
import { theme } from "@theme";

/**
 * Text component test.
 */

describe("Text component test", () => {
  it("Should be defined", () => {
    expect(Text).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<Text>Test text</Text>);

      const textElement = getByTestId("text-element");

      expect(textElement.props.children).toBe("Test text");
      expect(textElement.props.style).toStrictEqual({
        fontFamily: `${theme.font.family.text}-Regular`,
        color: theme.color.text,
      });
    });

    it("Should have fontWeight props", () => {
      const { getByTestId } = render(
        <Text style={{ fontWeight: "bold" }}>Test text</Text>,
      );

      const textElement = getByTestId("text-element");

      expect(textElement.props.style).toStrictEqual({
        fontFamily: `${theme.font.family.text}-Bold`,
        color: theme.color.text,
      });
    });

    it("Should have font props", () => {
      const { getByTestId } = render(
        <Text style={{ fontFamily: "Helvetica" }}>Test text</Text>,
      );

      const textElement = getByTestId("text-element");

      expect(textElement.props.style).toStrictEqual({
        fontFamily: "Helvetica-Regular",
        color: theme.color.text,
      });
    });
  });
});
