import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import lodash from "lodash";

import { mocksNavigation, mocksRoute } from "@tests";
import { Routes, UserRoles } from "@models";

// eslint-disable-next-line max-len
import { BASE_MOCKED_RECIPE_MODEL_RESPONSE } from "../recipeCreation/store/tests/mocks";
import * as getAllRecipesModules from "../../../services/recipes/getAllRecipes";
// eslint-disable-next-line max-len
import * as useAuthenticationModule from "../../../hooks/authentication/useAuthentication";
import { Recipes } from "./Recipes.tsx";
/**
 * Recipes component test.
 */

describe("Recipes component test", () => {
  it("Should be defined", () => {
    expect(Recipes).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    const mockedNavigation = mocksNavigation<Routes.RECIPES>();
    const mockedRoutes = mocksRoute<Routes.RECIPES>();

    const mockedRecipe1 = lodash.cloneDeep(BASE_MOCKED_RECIPE_MODEL_RESPONSE);
    mockedRecipe1._id = "1";
    const mockedRecipe2 = lodash.cloneDeep(BASE_MOCKED_RECIPE_MODEL_RESPONSE);
    mockedRecipe1._id = "2";

    jest
      .spyOn(getAllRecipesModules, "getAllRecipes")
      .mockResolvedValue([mockedRecipe1, mockedRecipe2]);

    it("Should render", async () => {
      // Mocks
      jest.spyOn(useAuthenticationModule, "useAuthentication").mockReturnValue({
        email: "",
        iat: 0,
        id: 0,
        pseudo: "",
        role: UserRoles.USER,
        isAuthenticated: false,
      });

      const { getByTestId, getAllByTestId, queryByTestId } = render(
        <Recipes navigation={mockedNavigation} route={mockedRoutes} />,
      );

      await waitFor(() => {
        const recipes = getByTestId("recipes");
        const recipeCards = getAllByTestId("recipe-card");
        const createRecipeButton = queryByTestId("create-recipe");

        expect(recipes).toBeDefined();
        expect(recipeCards.length).toBe(2);
        expect(createRecipeButton).toBeNull();
      });
    });

    it("Should navigate to create recipe when admin", async () => {
      // Mocks

      jest.spyOn(useAuthenticationModule, "useAuthentication").mockReturnValue({
        email: "",
        iat: 0,
        id: 0,
        pseudo: "",
        role: UserRoles.ADMIN,
        isAuthenticated: false,
      });

      const { getByTestId } = render(
        <Recipes navigation={mockedNavigation} route={mockedRoutes} />,
      );

      await waitFor(() => {
        const createRecipeButton = getByTestId("create-recipe");

        fireEvent.press(createRecipeButton);

        expect(mockedNavigation.navigate).toHaveBeenCalledWith(
          Routes.RECIPE_CREATION,
          {},
        );
      });
    });
  });
});
