import { describe, expect, it, jest } from "@jest/globals";

import { getIngredients } from "@services";
import { IngredientsCategory, ServerError } from "@models";
import { serverErrorHandler } from "@utils";

type MockedIngredientResponse = {
  id: number;
  name: string;
  measureUnit: string;
  dosage: number | null;
  category: IngredientsCategory;
};

/**
 *  Get ingredients list service test.
 */

describe("Get ingredients list service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(getIngredients).toBeDefined();
  });

  describe("tests", () => {
    // Mocks
    const mockedIngredientsList = [
      {
        id: 1,
        name: "malt1",
        measureUnit: "kg",
        dosage: null,
        category: IngredientsCategory.MALTS,
      },
      {
        id: 2,
        name: "hops1",
        measureUnit: "kg",
        dosage: null,
        category: IngredientsCategory.HOPS,
      },
      {
        id: 3,
        name: "yeast1",
        measureUnit: "g/l",
        dosage: 99,
        category: IngredientsCategory.YEASTS,
      },
      {
        id: 4,
        name: "divers1",
        measureUnit: "kg",
        dosage: null,
        category: IngredientsCategory.MISCELLANEOUS,
      },
      {
        id: 5,
        name: "sucre1",
        measureUnit: "kg",
        dosage: null,
        category: IngredientsCategory.SUGARS,
      },
    ];

    it("Should get ingredients", async () => {
      // Mocks
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn<() => Promise<MockedIngredientResponse[]>>()
          .mockResolvedValueOnce(mockedIngredientsList),
      } as Partial<Response> as Response);

      const ingredientsResponse = await getIngredients();

      // Expected
      const expectedIngredientsList = {
        [IngredientsCategory.MALTS]: mockedIngredientsList.filter(
          (ingredient) => ingredient.category === IngredientsCategory.MALTS,
        ),
        [IngredientsCategory.HOPS]: mockedIngredientsList.filter(
          (ingredient) => ingredient.category === IngredientsCategory.HOPS,
        ),
        [IngredientsCategory.YEASTS]: mockedIngredientsList.filter(
          (ingredient) => ingredient.category === IngredientsCategory.YEASTS,
        ),
        [IngredientsCategory.MISCELLANEOUS]: mockedIngredientsList.filter(
          (ingredient) =>
            ingredient.category === IngredientsCategory.MISCELLANEOUS,
        ),
        [IngredientsCategory.SUGARS]: mockedIngredientsList.filter(
          (ingredient) => ingredient.category === IngredientsCategory.SUGARS,
        ),
      };

      expect(ingredientsResponse).toStrictEqual(expectedIngredientsList);
    });

    it("Should handle request error", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        json: jest
          .fn<() => Promise<Partial<ServerError>>>()
          .mockResolvedValueOnce({
            status: 400,
          }),
      } as Partial<Response> as Response);

      await expect(getIngredients()).rejects.toBe(
        serverErrorHandler({
          status: 400,
          error: "Test-error",
          message: "Test-message",
        }),
      );
    });
  });
});
