import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { IngredientListItem } from "./IngredientListItem.tsx";
import * as ReducersModule from "../../../store/store.ts";

import { IngredientsCategory } from "../../../models";
import { mockedContextValues } from "../../../tests/mockedContextValues";
import { recipeStore } from "../../../store/store.ts";

// eslint-disable-next-line max-len
import * as useRecipeCreationContextModule from "../../../hooks/useRecipeCreationContext.ts";
import { RecipeState } from "../../../store/models/RecipeState.ts";

/**
 * IngredientListItem component test.
 */

describe("IngredientListItem component test", () => {
  it("Should be defined", () => {
    expect(IngredientListItem).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    jest
      .spyOn(useRecipeCreationContextModule, "useRecipeCreationContext")
      .mockReturnValue(mockedContextValues);

    const mockedData =
      mockedContextValues.ingredientsList[IngredientsCategory.MALTS];

    // Mocks
    const mockedMeasureInWindow = jest.fn().mockImplementation((callback) => {
      (callback as (x: number, y: number, h: number, w: number) => void)(
        1,
        2,
        10,
        20,
      );
    });

    beforeEach(() => {
      jest.spyOn(recipeStore, "getState").mockReturnValue({
        ingredients: {
          [IngredientsCategory.MALTS]: [
            mockedContextValues.ingredientsList[IngredientsCategory.MALTS][0],
          ],
        },
      } as unknown as RecipeState);
    });

    it("Should render", () => {
      const { getByTestId, getAllByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          data={mockedData}
        />,
      );

      const ingredientListItem = getByTestId("ingredient-list-item");
      const ingredientFormItems = getAllByTestId("ingredient-form-item");
      expect(ingredientListItem).toBeDefined();
      expect(ingredientFormItems.length).toBe(1);
    });

    it("Should render multiple store ingredient", () => {
      jest.spyOn(recipeStore, "getState").mockReturnValue({
        ingredients: {
          [IngredientsCategory.MALTS]: [
            mockedContextValues.ingredientsList[IngredientsCategory.MALTS][0],
            mockedContextValues.ingredientsList[IngredientsCategory.MALTS][1],
          ],
        },
      } as unknown as RecipeState);

      const { getAllByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          data={mockedData}
        />,
      );

      const ingredientFormItems = getAllByTestId("ingredient-form-item");
      expect(ingredientFormItems.length).toBe(2);
    });

    it("Should render with resugaring checkbox", () => {
      const { getByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          data={mockedData}
          resugaring
        />,
      );

      const ingredientListItem = getByTestId("resugaring");
      expect(ingredientListItem).toBeDefined();
    });

    it("Should render with dosage", async () => {
      jest.spyOn(recipeStore, "getState").mockReturnValue({
        ingredients: {
          [IngredientsCategory.YEASTS]: [
            {
              name: "test-yeast",
              qty: 0,
              dosage: 1,
              resugaring: false,
            },
          ],
        },
      } as unknown as RecipeState);

      const mockedDosageData = [
        mockedContextValues.ingredientsList[IngredientsCategory.YEASTS][0],
      ];

      mockedDosageData[0].dosage = 10;
      mockedDosageData[0].measureUnit = "g/l";

      const { getByTestId, queryByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.YEASTS}
          data={mockedDosageData}
        />,
      );

      const dosageElement = getByTestId("dosage");
      const qtyInput = queryByTestId("input");

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      fireEvent.press(select);
      const selectItem = getByTestId("select-dropdown-item");

      fireEvent.press(selectItem);

      await waitFor(() => {
        expect(dosageElement).toBeDefined();
        expect(qtyInput).toBeNull();
      });
    });

    it("Should add an ingredient", async () => {
      const { getByTestId, getAllByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          data={mockedData}
        />,
      );

      const addButton = getByTestId("ingredient-add-button");
      fireEvent.press(addButton);

      await waitFor(() => {
        const ingredientFormItems = getAllByTestId("ingredient-form-item");
        expect(ingredientFormItems.length).toBe(2);
      });
    });

    it("Should set recipe store", async () => {
      // Spies
      jest.spyOn(recipeStore, "dispatch");
      const updateIngredientsSpy = jest.spyOn(
        ReducersModule,
        "updateIngredients",
      );

      const { getByTestId, getAllByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          data={mockedData}
          resugaring
        />,
      );

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      const checkbox = getByTestId("resugaring");

      const input = getByTestId("input");

      fireEvent.press(select);
      const selectItems = getAllByTestId("select-dropdown-item");

      fireEvent.press(selectItems[0]);

      await waitFor(() => {
        expect(updateIngredientsSpy).toHaveBeenCalledWith({
          ingredientIndex: 0,
          ingredientKey: "name",
          value: mockedData[0].name,
          ingredientModel: mockedData[0],
        });
      });

      fireEvent.changeText(input, "999");

      await waitFor(() => {
        expect(updateIngredientsSpy).toHaveBeenCalledWith({
          ingredientIndex: 0,
          ingredientKey: "qty",
          value: 999,
          ingredientModel: mockedData[0],
        });
      });

      fireEvent.press(checkbox);

      await waitFor(() => {
        expect(updateIngredientsSpy).toHaveBeenCalledWith({
          ingredientIndex: 0,
          ingredientKey: "resugaring",
          value: true,
          ingredientModel: mockedData[0],
        });
      });
    });

    it("Should update an existing ingredient", async () => {
      // Spies
      const updateIngredientsSpy = jest.spyOn(
        ReducersModule,
        "updateIngredients",
      );

      const { getByTestId, getAllByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          data={mockedData}
          resugaring
        />,
      );

      const input = getByTestId("input");

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;
      fireEvent.press(select);
      const selectItems = getAllByTestId("select-dropdown-item");

      fireEvent.press(selectItems[0]);
      fireEvent.changeText(input, "999");

      await waitFor(() => {
        expect(updateIngredientsSpy).toHaveBeenCalledWith({
          ingredientIndex: 0,
          ingredientKey: "qty",
          value: 999,
          ingredientModel: mockedData[0],
        });
      });
    });

    it("Should handle empty ingredient list", () => {
      const { getByTestId, queryAllByTestId } = render(
        <IngredientListItem
          category={IngredientsCategory.MALTS}
          // Need to use undefined to mock backend ingredient request error.
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          data={undefined}
          resugaring
        />,
      );

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      fireEvent.press(select);
      const selectItems = queryAllByTestId("select-dropdown-item");

      expect(selectItems.length).toBe(0);
    });
  });
});
