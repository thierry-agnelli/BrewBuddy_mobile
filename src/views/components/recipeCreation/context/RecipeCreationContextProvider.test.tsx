import { View } from "react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { render, waitFor } from "@testing-library/react-native";
// eslint-disable-next-line max-len
import { RecipeCreationContextProvider } from "./RecipeCreationContextProvider.tsx";
import { useRecipeCreationContext } from "../hooks";
import { IngredientsCategory, IngredientsList } from "@models";
// eslint-disable-next-line max-len
import * as getIngredientModules from "../../../../services/ingredients/getIngredients.ts";

/**
 * RecipeCreationContextProvider component test.
 */

describe("RecipeCreationContextProvider component test", () => {
  it("Should be defined", () => {
    expect(RecipeCreationContextProvider).toBeDefined();
  });

  describe("Tests", () => {
    let mockedIngredientsContext: IngredientsList;

    const TestComponent = () => {
      const { ingredientsList } = useRecipeCreationContext();

      mockedIngredientsContext = ingredientsList;

      return <View testID={"provider-test"} />;
    };

    it("Should render", async () => {
      const mockedIngredientList = {} as IngredientsList;

      Object.values(IngredientsCategory).forEach((category) => {
        mockedIngredientList[category] = [
          {
            id: 1,
            name: category,
            measureUnit: "g",
            dosage: null,
            category: IngredientsCategory.MALTS,
          },
        ];
      });

      jest
        .spyOn(getIngredientModules, "getIngredients")
        .mockResolvedValue(mockedIngredientList);

      const { getByTestId } = render(
        <RecipeCreationContextProvider>
          <TestComponent />
        </RecipeCreationContextProvider>,
      );

      const providerTest = getByTestId("provider-test");
      expect(providerTest).toBeDefined();

      await waitFor(() => {
        expect(mockedIngredientsContext).toStrictEqual(mockedIngredientList);
      });
    });

    it("Should render with getIngredient service error", async () => {
      const mockedIngredientList = {} as IngredientsList;

      Object.values(IngredientsCategory).forEach((category) => {
        mockedIngredientList[category] = [];
      });

      jest
        .spyOn(getIngredientModules, "getIngredients")
        .mockRejectedValue("mocked error");

      const { getByTestId } = render(
        <RecipeCreationContextProvider>
          <TestComponent />
        </RecipeCreationContextProvider>,
      );

      const providerTest = getByTestId("provider-test");
      expect(providerTest).toBeDefined();

      await waitFor(() => {
        expect(mockedIngredientsContext).toStrictEqual(mockedIngredientList);
      });
    });
  });
});
