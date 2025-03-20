import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";

import { IngredientsList } from "./IngredientsList";
// eslint-disable-next-line max-len
import * as useRecipeCreationContextModule from "../../hooks/useRecipeCreationContext";
import { mockedContextValues } from "../../tests/mockedContextValues";

/**
 * IngredientsList component test.
 */

describe("IngredientsList component test", () => {
  it("Should be defined", () => {
    expect(IngredientsList).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      jest
        .spyOn(useRecipeCreationContextModule, "useRecipeCreationContext")
        .mockReturnValue(mockedContextValues);

      const { getByTestId } = render(<IngredientsList />);

      const ingredientsList = getByTestId("ingredients-list");
      expect(ingredientsList).toBeDefined();
    });
  });
});
