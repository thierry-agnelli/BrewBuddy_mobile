import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { mocksNavigation, mocksRoute } from "@tests";
import lodash from "lodash";

import {
  Routes,
  RecipeModelResponse,
  RecipeModel,
  IngredientsCategory,
} from "@models";
import * as getRecipeModule from "../../../services/recipes/getRecipe";

import {
  BASE_MOCKED_RECIPE_MODEL,
  BASE_MOCKED_RECIPE_MODEL_RESPONSE,
} from "../recipeCreation/store/tests/mocks.ts";

import { Recipe } from "./Recipe.tsx";

/**
 * Recipe view test.
 */

describe("Recipe view test", () => {
  it("Should be defined", () => {
    expect(Recipe).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.RECIPE>();
    let mockedRecipeResponse: RecipeModelResponse;
    let mockedRecipe: RecipeModel;

    beforeEach(() => {
      mockedRecipeResponse = lodash.cloneDeep(
        BASE_MOCKED_RECIPE_MODEL_RESPONSE,
      );
      mockedRecipe = lodash.cloneDeep(BASE_MOCKED_RECIPE_MODEL);
    });

    it("Should render with recipeId parameters", async () => {
      // Mocks
      mockedRecipeResponse.recipeIngredients[0].ingredients.push({
        ingredientID: 1,
        name: "test-malt1",
        quantity: 99,
      });
      mockedRecipeResponse.recipeIngredients[0].ingredients.push({
        ingredientID: 2,
        name: "test-malt2",
        quantity: 99,
      });
      mockedRecipeResponse.recipeIngredients[1].ingredients.push({
        ingredientID: 3,
        name: "test-hops",
        quantity: 99,
      });
      mockedRecipeResponse.steps.mashing.steps.push({
        temperature: 20,
        duration: 42,
      });
      mockedRecipeResponse.steps.mashing.steps.push({
        temperature: 20,
        duration: 42,
      });
      mockedRecipeResponse.steps.boiling.push({
        whenToAdd: 20,
        duration: 42,
      });
      mockedRecipeResponse.steps.boiling.push({
        whenToAdd: 20,
        duration: 42,
      });

      const getRecipeSpy = jest
        .spyOn(getRecipeModule, "getRecipe")
        .mockResolvedValueOnce(mockedRecipeResponse);

      const mockedRoute = mocksRoute<Routes.RECIPE>({
        recipe: "recipeID",
      });

      const { getByTestId, getAllByTestId } = render(
        <Recipe navigation={mockedNavigation} route={mockedRoute} />,
      );

      await waitFor(() => {
        const recipe = getByTestId("recipe");
        const categories = getAllByTestId("category");
        const maltsIngredients = getAllByTestId(
          `ingredient-${IngredientsCategory.MALTS}-details`,
        );
        const hopsIngredients = getAllByTestId(
          `ingredient-${IngredientsCategory.HOPS}-details`,
        );
        const mashingSteps = getAllByTestId("mashing-step");
        const boilingSteps = getAllByTestId("boiling-step");

        expect(getRecipeSpy).toHaveBeenCalledWith("recipeID");
        expect(recipe).toBeDefined();
        expect(categories.length).toBe(5);
        expect(maltsIngredients.length).toBe(2);
        expect(hopsIngredients.length).toBe(1);
        expect(mashingSteps.length).toBe(2);
        expect(boilingSteps.length).toBe(2);
      });
    });

    it("Should render with recipe parameters", async () => {
      // Mocks
      const mockedRoute = mocksRoute<Routes.RECIPE>({
        recipe: mockedRecipe,
      });

      const { getByTestId } = render(
        <Recipe navigation={mockedNavigation} route={mockedRoute} />,
      );

      await waitFor(() => {
        const recipe = getByTestId("recipe");
        expect(recipe).toBeDefined();
      });
    });

    it("Should handle no recipe or ingredient name", async () => {
      // Mocks
      mockedRecipeResponse.profil.name = "";
      mockedRecipeResponse.recipeIngredients[0].ingredients.push({
        ingredientID: 1,
        name: "",
        quantity: 99,
      });
      mockedRecipeResponse.recipeIngredients[0].ingredients.push({
        ingredientID: 1,
        name: "",
        quantity: null,
      });
      jest
        .spyOn(getRecipeModule, "getRecipe")
        .mockResolvedValueOnce(mockedRecipeResponse);

      const mockedRoute = mocksRoute<Routes.RECIPE>({
        recipe: "recipeID",
      });

      const { getByTestId, getAllByTestId } = render(
        <Recipe navigation={mockedNavigation} route={mockedRoute} />,
      );
      await waitFor(() => {
        const recipeName = getByTestId("recipe-name");
        const ingredients = getAllByTestId(
          `ingredient-${IngredientsCategory.MALTS}-details`,
        );
        expect(recipeName.props.children).toBe("<NOM>");
        expect(ingredients[0].props.children).toStrictEqual(["<NOM>", " 99"]);
        expect(ingredients[1].props.children).toStrictEqual(["<NOM>", null]);
      });
    });

    it("Should return to recipes view", () => {
      // Mocks
      const mockedRoute = mocksRoute<Routes.RECIPE>({
        recipe: mockedRecipe,
      });

      const { getByTestId } = render(
        <Recipe navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("recipes-list-button");

      fireEvent.press(button);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(
        Routes.RECIPES,
        {},
      );
    });
  });
});
