import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

import { mocksNavigation } from "@tests";
import { RecipeModelResponse, Routes } from "@models";

import { RecipeCard } from "./RecipeCard.tsx";
// eslint-disable-next-line max-len
import { BASE_MOCKED_RECIPE_MODEL_RESPONSE } from "../../recipeCreation/store/tests/mocks.ts";
import lodash from "lodash";

/**
 * RecipeCard component test.
 */

describe("RecipeCard component test", () => {
  it("Should be defined", () => {
    expect(RecipeCard).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    const mockedNavigation = mocksNavigation<Routes>();
    let mockedRecipeResponse: RecipeModelResponse;

    beforeEach(() => {
      mockedRecipeResponse = lodash.cloneDeep(
        BASE_MOCKED_RECIPE_MODEL_RESPONSE,
      );
    });

    it("Should render", () => {
      const { getByTestId } = render(
        <RecipeCard
          navigate={mockedNavigation.navigate}
          recipe={mockedRecipeResponse}
        />,
      );

      const recipeCard = getByTestId("recipe-card");
      expect(recipeCard).toBeDefined();
    });

    it("Should Naviogate to Recipe", () => {
      const { getByTestId } = render(
        <RecipeCard
          navigate={mockedNavigation.navigate}
          recipe={mockedRecipeResponse}
        />,
      );

      const touchableElement = getByTestId("recipe-card");
      fireEvent.press(touchableElement);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.RECIPE, {
        recipe: mockedRecipeResponse,
      });
    });
  });
});
