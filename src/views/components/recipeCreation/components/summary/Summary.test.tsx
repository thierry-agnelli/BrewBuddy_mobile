import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import lodash from "lodash";

import { AppContextValues } from "@components";
import { IngredientsList, RecipeModel, Routes } from "@models";
import { theme } from "@theme";
import { mocksNavigation } from "@tests";

import { recipeStore } from "../../store/store";
import {
  BASE_MOCKED_STATE,
  BASE_MOCKED_RECIPE_MODEL,
  BASE_MOCKED_RECIPE_MODEL_RESPONSE,
} from "../../store/tests/mocks.ts";
import {
  BoilingStep,
  IngredientsCategory,
  RecipeIngredient,
} from "../../models";
// eslint-disable-next-line max-len
import * as useRecipeCreationContextModule from "../../hooks/useRecipeCreationContext";
import * as checkRecipeCreationModule from "../../utils/checkRecipeCreation";
// eslint-disable-next-line max-len
import * as useAppContextModule from "../../../../../hooks/appContext/useAppContext";
import * as postRecipeModule from "../../../../../services/recipes/postRecipe";
// eslint-disable-next-line max-len
import * as validateRecipeModule from "../../../../../services/recipes/validateRecipe";

import { RecipeState } from "../../store/models/RecipeState.ts";
import { Summary } from "./Summary.tsx";

/**
 * Summary component test.
 */

describe("Summary component test", () => {
  it("Should be defined", () => {
    expect(Summary).toBeDefined();
  });

  describe("Tests", () => {
    // mocks
    const mockedNavigation = mocksNavigation<Routes>();
    jest
      .spyOn(useAppContextModule, "useAppContext")
      .mockReturnValue({ authToken: "token" } as AppContextValues);
    jest
      .spyOn(useRecipeCreationContextModule, "useRecipeCreationContext")
      .mockReturnValue({
        step: 0,
        setStep: jest.fn(),
        navigate: mockedNavigation.navigate,
        ingredientsList: {} as IngredientsList,
      });

    // store
    let mockedState: RecipeState;

    beforeEach(() => {
      mockedState = lodash.cloneDeep(BASE_MOCKED_STATE);

      // ingredients
      mockedState.ingredients[IngredientsCategory.MALTS].push({
        id: 0,
        name: "test-malt",
        qty: 99,
        measureUnit: "kg",
      } as RecipeIngredient);
      mockedState.ingredients[IngredientsCategory.HOPS].push({
        id: 1,
        name: "test-hop",
        qty: 999,
        measureUnit: "g",
      } as RecipeIngredient);
      mockedState.ingredients[IngredientsCategory.YEASTS].push({
        id: 2,
        name: "test-yeast",
        dosage: 8,
        measureUnit: "g/l",
      } as RecipeIngredient);
      // mashing
      mockedState.mashing.mashRests.push({
        temperature: 99,
        duration: 42,
      });
      // boiling step
      mockedState.boiling.boilingSteps.push({
        name: "test-hop",
        addingTime: 10,
        duration: 20,
      } as BoilingStep);

      jest.spyOn(recipeStore, "getState").mockReturnValue(mockedState);
    });

    it("Should render", () => {
      // mocks

      mockedState.ingredients[IngredientsCategory.SUGARS].push({
        id: 3,
        name: "test-sugar",
        dosage: 8,
        measureUnit: "g",
        resugaring: true,
      } as RecipeIngredient);

      const { getByTestId, queryByTestId, getAllByTestId } = render(
        <Summary onConfirmation={() => {}} />,
      );

      const summary = getByTestId("recipe-summary");
      const ingredientsCards = getAllByTestId("ingredient-summary-card");
      const ingredientMaltsSummaries = getByTestId(
        `ingredient-${IngredientsCategory.MALTS}-summary`,
      );
      const ingredientHopsSummaries = getByTestId(
        `ingredient-${IngredientsCategory.HOPS}-summary`,
      );
      const ingredientYeastsSummaries = getByTestId(
        `ingredient-${IngredientsCategory.YEASTS}-summary`,
      );
      const ingredientSugarsSummaries = getByTestId(
        `ingredient-${IngredientsCategory.SUGARS}-summary`,
      );
      const mashOutSummary = getByTestId("mash-out");
      const mashRestsSummaries = getAllByTestId("mash-rest");
      const boilingStepsSummaries = getByTestId("boiling-step");
      const button = getByTestId("send-button");
      const buttonTitle = getByTestId("send-button-title");
      const buttonIcon = queryByTestId("send-button-icon");

      expect(summary).toBeDefined();
      expect(ingredientsCards.length).toBe(5);
      expect(ingredientMaltsSummaries.props.children).toStrictEqual([
        "test-malt",
        " 99",
        "kg",
        "",
      ]);
      expect(ingredientHopsSummaries.props.children).toStrictEqual([
        "test-hop",
        " 999",
        "g",
        "",
      ]);
      expect(ingredientYeastsSummaries.props.children).toStrictEqual([
        "test-yeast",
        " 8",
        "g/l",
        "",
      ]);
      expect(ingredientSugarsSummaries.props.children).toStrictEqual([
        "test-sugar",
        " 8",
        "g",
        " (resucrage)",
      ]);
      expect(mashOutSummary.props.children).toStrictEqual(["Mashout: ", "Non"]);
      expect(mashRestsSummaries.length).toBe(1);
      expect(mashRestsSummaries[0].props.children).toStrictEqual([
        1,
        ": ",
        99,
        "°C ",
        42,
        " mn",
      ]);
      expect(boilingStepsSummaries.props.children).toStrictEqual([
        "test-hop",
        ": ajout ",
        10,
        "mn / durée ",
        20,
        "mn",
      ]);
      expect(button.props.disabled).toBeFalsy();
      expect(buttonTitle.props.children).toBe("Envoyer");
      expect(buttonIcon).toBeNull();
    });

    it("Should display mash out true", () => {
      // mocks
      const mockedMashoutState = lodash.cloneDeep(BASE_MOCKED_STATE);
      mockedMashoutState.mashing.mashOut = true;

      jest
        .spyOn(recipeStore, "getState")
        .mockReturnValueOnce(mockedMashoutState);
      const { getByTestId } = render(<Summary onConfirmation={() => {}} />);

      const mashOutSummary = getByTestId("mash-out");
      expect(mashOutSummary.props.children).toStrictEqual(["Mashout: ", "Oui"]);
    });

    it("Should call onConfirmation on return button", () => {
      const mockedOnConfirmation = jest.fn();

      const { getByTestId } = render(
        <Summary onConfirmation={mockedOnConfirmation} />,
      );

      const button = getByTestId("return-button");

      fireEvent.press(button);

      expect(mockedOnConfirmation).toHaveBeenCalledWith();
    });

    it("Should not send request if no authToken", async () => {
      jest
        .spyOn(useAppContextModule, "useAppContext")
        .mockReturnValueOnce({ authToken: null } as AppContextValues);

      jest
        .spyOn(checkRecipeCreationModule, "checkRecipeCreation")
        .mockReturnValueOnce(true);

      const mockedOnConfirmation = jest.fn();

      const { getByTestId } = render(
        <Summary onConfirmation={mockedOnConfirmation} />,
      );

      const button = getByTestId("send-button");

      await act(() => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedOnConfirmation).not.toHaveBeenCalled();
      });
    });

    it("Should send request: receive error", async () => {
      // mocks
      jest
        .spyOn(postRecipeModule, "postRecipe")
        .mockRejectedValueOnce("request error");

      jest
        .spyOn(checkRecipeCreationModule, "checkRecipeCreation")
        .mockReturnValueOnce(true);

      jest
        .spyOn(global, "fetch")
        .mockResolvedValueOnce("success" as unknown as Response);

      const mockedOnConfirmation = jest.fn();

      const { getByTestId } = render(
        <Summary onConfirmation={mockedOnConfirmation} />,
      );

      const button = getByTestId("send-button");

      await act(() => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedOnConfirmation).not.toHaveBeenCalled();

        const summeryError = getByTestId("summary-error");
        expect(summeryError.props.children).toBe("request error");
      });
    });

    it("Should send request with ended recipe: receive success", async () => {
      // mocks
      mockedState.boiling.boilingSteps.push({
        name: "test-misc",
        addingTime: undefined,
        duration: 30,
      } as BoilingStep);

      // Recipe model.
      const mockedRecipeModel: RecipeModel = lodash.cloneDeep(
        BASE_MOCKED_RECIPE_MODEL,
      );

      // malt
      mockedRecipeModel.recipeIngredients[0].ingredients.push({
        ingredientID: 0,
        name: "test-malt",
        quantity: 99,
      });
      // hop
      mockedRecipeModel.recipeIngredients[1].ingredients.push({
        ingredientID: 1,
        name: "test-hop",
        quantity: 999,
      });
      // yeasts
      mockedRecipeModel.recipeIngredients[2].ingredients.push({
        ingredientID: 2,
        name: "test-yeast",
        quantity: null,
      });
      // mashing
      mockedRecipeModel.steps.mashing.steps.push({
        temperature: 99,
        duration: 42,
      });
      // boiling
      mockedRecipeModel.steps.boiling.push({
        duration: 20,
        whenToAdd: 10,
      });
      mockedRecipeModel.steps.boiling.push({
        duration: 30,
        whenToAdd: 0,
      });

      const postRecipeSpy = jest
        .spyOn(postRecipeModule, "postRecipe")
        .mockResolvedValueOnce(BASE_MOCKED_RECIPE_MODEL_RESPONSE);

      jest
        .spyOn(checkRecipeCreationModule, "checkRecipeCreation")
        .mockReturnValueOnce(true);

      jest
        .spyOn(global, "fetch")
        .mockResolvedValueOnce("success" as unknown as Response);

      jest
        .spyOn(validateRecipeModule, "validateRecipe")
        .mockResolvedValue("Success");

      const mockedOnConfirmation = jest.fn();

      const { getByTestId } = render(
        <Summary onConfirmation={mockedOnConfirmation} />,
      );

      const button = getByTestId("send-button");
      const recipeEndedCheckbox = getByTestId("recipe-ended");

      await act(() => {
        fireEvent.press(recipeEndedCheckbox);
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(postRecipeSpy).toHaveBeenCalledWith(mockedRecipeModel, "token");
        expect(mockedOnConfirmation).toHaveBeenCalledWith();
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.RECIPE, {
          recipe: "recipeID",
        });
      });
    });

    // eslint-disable-next-line max-len
    it("Should send request with no ended recipe: receive success", async () => {
      jest
        .spyOn(postRecipeModule, "postRecipe")
        .mockResolvedValueOnce(BASE_MOCKED_RECIPE_MODEL_RESPONSE);

      jest
        .spyOn(checkRecipeCreationModule, "checkRecipeCreation")
        .mockReturnValueOnce(true);

      const mockedOnConfirmation = jest.fn();

      const { getByTestId } = render(
        <Summary onConfirmation={mockedOnConfirmation} />,
      );

      const button = getByTestId("send-button");

      await act(() => {
        fireEvent.press(button);
      });

      await waitFor(() => {
        expect(mockedNavigation.navigate).toHaveBeenCalledWith(Routes.HOME, {});
      });
    });

    it("Should display recipe error", () => {
      // mocks
      mockedState.beerProfile.name = "";
      mockedState.beerProfile.type = "";
      mockedState.beerProfile.description = "";
      jest.spyOn(recipeStore, "getState").mockReturnValue(mockedState);

      const { getByText } = render(<Summary onConfirmation={() => {}} />);

      const name = getByText("<NOM>");
      const type = getByText("<TYPE>");
      const description = getByText("<DESCRIPTION>");

      const errorStyle = {
        color: theme.color.error,
        fontFamily: "Roboto-Bold",
      };

      expect(name).toBeDefined();
      expect(name.props.style).toEqual(expect.objectContaining(errorStyle));
      expect(type).toBeDefined();
      expect(type.props.style).toEqual(expect.objectContaining(errorStyle));
      expect(description).toBeDefined();
      expect(description.props.style).toEqual(
        expect.objectContaining(errorStyle),
      );
    });

    it("Should handle validate error", async () => {
      jest
        .spyOn(postRecipeModule, "postRecipe")
        .mockResolvedValueOnce(BASE_MOCKED_RECIPE_MODEL_RESPONSE);

      jest
        .spyOn(checkRecipeCreationModule, "checkRecipeCreation")
        .mockReturnValueOnce(true);

      jest
        .spyOn(validateRecipeModule, "validateRecipe")
        .mockRejectedValue("Validating error test");

      const mockedOnConfirmation = jest.fn();

      const { getByTestId, getByText } = render(
        <Summary onConfirmation={mockedOnConfirmation} />,
      );

      const button = getByTestId("send-button");
      const recipeEndedCheckbox = getByTestId("recipe-ended");

      await act(() => {
        fireEvent.press(recipeEndedCheckbox);
        fireEvent.press(button);
      });

      await waitFor(() => {
        const errorMessage = getByText("Validating error test");
        expect(errorMessage).toBeDefined();
      });
    });
  });
});
