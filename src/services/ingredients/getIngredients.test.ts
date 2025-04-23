import { describe, expect, it, jest } from "@jest/globals";

import { getIngredients } from "@services";
import { IngredientsCategory } from "@models";
import { env } from "@configs";

import * as getModule from "../utils/getService.ts";

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

    it("Should call get service", async () => {
      const getSpy = jest
        .spyOn(getModule, "getService")
        .mockResolvedValue(mockedIngredientsList);
      const response = await getIngredients();
      const mockUrl = `${env.API_URL}/api/ingredients/all`;
      const expectedResponse = {
        [IngredientsCategory.MALTS]: [mockedIngredientsList[0]],
        [IngredientsCategory.HOPS]: [mockedIngredientsList[1]],
        [IngredientsCategory.YEASTS]: [mockedIngredientsList[2]],
        [IngredientsCategory.MISCELLANEOUS]: [mockedIngredientsList[3]],
        [IngredientsCategory.SUGARS]: [mockedIngredientsList[4]],
      };

      expect(getSpy).toBeCalledWith({ url: mockUrl });
      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
