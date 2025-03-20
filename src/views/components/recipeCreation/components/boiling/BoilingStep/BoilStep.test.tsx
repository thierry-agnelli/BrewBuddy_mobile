import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { BoilStep } from "./BoilStep.tsx";
import { IngredientsCategory } from "../../../models";
import { recipeStore } from "../../../store/store";
import { BASE_MOCKED_STATE } from "../../../store/tests/mocks.ts";

import { theme } from "@theme";
import lodash, { cloneDeep } from "lodash";

/**
 * BoilingStep component test.
 */
describe("BoilingStep Component", () => {
  it("Should be defined", () => {
    expect(BoilStep).toBeDefined();
  });

  describe("Tests", () => {
    // Mocks
    const mockedMeasureInWindow = jest.fn().mockImplementation((callback) => {
      (callback as (x: number, y: number, h: number, w: number) => void)(
        1,
        2,
        10,
        20,
      );
    });
    const mockedItem = {
      key: 0,
      name: "",
      addingTime: 0,
      isAddingTimeValid: true,
      unit: "",
      duration: 0,
    };
    const mockedIngredientsList = [
      {
        id: 1,
        name: "test-hops",
        measureUnit: "g",
        dosage: null,
        qty: 999,
        category: IngredientsCategory.HOPS,
      },
    ];
    const mockedOnChange = jest.fn();

    it("Should render", () => {
      const { getByTestId } = render(
        <BoilStep
          isActive={false}
          item={mockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );

      const boilStep = getByTestId("boiling-step");
      expect(boilStep).toBeDefined();
    });

    it("Should fire onChange event", async () => {
      const { getByTestId, getAllByTestId, getByText } = render(
        <BoilStep
          isActive={false}
          item={mockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );
      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      await waitFor(() => {
        const dropdownItem = getAllByTestId("select-dropdown-item");

        fireEvent.press(dropdownItem[0]);

        const selectedIngredient = getByText("test-hops");
        const displayQuantity = getByText("999");

        expect(selectedIngredient).toBeDefined();
        expect(displayQuantity).toBeDefined();
      });

      const addTimeInput = getByTestId("add-input");
      await fireEvent.changeText(addTimeInput, "400");

      await waitFor(() => {
        expect(mockedOnChange).toHaveBeenCalledWith(0, "g", "addingTime", 400);
      });

      const durationInput = getByTestId("duration-input");

      await fireEvent.changeText(durationInput, "42");

      await waitFor(() => {
        expect(mockedOnChange).toHaveBeenCalledWith(0, "g", "duration", 42);
      });
    });

    it("Should fire onChange event with empty value = 0", async () => {
      const { getByTestId, getAllByTestId } = render(
        <BoilStep
          isActive={false}
          item={mockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );
      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      await waitFor(() => {
        const dropdownItem = getAllByTestId("select-dropdown-item");

        fireEvent.press(dropdownItem[0]);
      });

      const addTimeInput = getByTestId("add-input");
      await fireEvent.changeText(addTimeInput, "");

      await waitFor(() => {
        expect(mockedOnChange).toHaveBeenCalledWith(0, "g", "addingTime", 0);
      });
    });

    it("Shouldn't display ingredient not in boiling category", async () => {
      mockedIngredientsList.push({
        id: 2,
        name: "test-malt",
        measureUnit: "g",
        dosage: null,
        qty: 250,
        category: IngredientsCategory.MALTS,
      });

      const { getByTestId, queryByText, getAllByTestId } = render(
        <BoilStep
          isActive={false}
          item={mockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      await waitFor(() => {
        const dropdownItem = getAllByTestId("select-dropdown-item");
        const maltDropdownItem = queryByText("test-malt");
        expect(dropdownItem.length).toBe(1);
        expect(maltDropdownItem).toBeNull();
      });
    });

    it("Shouldn't display already used ingredient", async () => {
      const mockedRecipeState = lodash.cloneDeep(BASE_MOCKED_STATE);
      mockedRecipeState.boiling.boilingSteps.push({
        name: "test-hops",
        addingTime: 0,
        isAddingTimeValid: true,
        duration: 0,
        unit: "g",
      });

      jest
        .spyOn(recipeStore, "getState")
        .mockReturnValueOnce(mockedRecipeState);

      const { getByTestId, queryByText } = render(
        <BoilStep
          isActive={false}
          item={mockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );

      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      await waitFor(() => {
        const hopsDropdownItem = queryByText("test-hops");
        // expect(dropdownItem.length).toBe(0);
        expect(hopsDropdownItem).toBeNull();
      });
    });

    it("Should display existing step", async () => {
      const existingMockedItem = cloneDeep(mockedItem);
      existingMockedItem.name = "test-hops";
      existingMockedItem.addingTime = 999;
      existingMockedItem.duration = 42;

      const { getByTestId, getByText, getAllByTestId } = render(
        <BoilStep
          isActive={false}
          item={existingMockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );

      const selectedValue = getByText("test-hops");
      expect(selectedValue).toBeDefined();

      const qtyInput = getByTestId("add-input");
      expect(qtyInput.props.value).toBe("999");

      const durationInput = getByTestId("duration-input");
      expect(durationInput.props.value).toBe("42");

      // Current ingredient still available in dropdown
      const select = getByTestId("select-input");
      select!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(select);

      await waitFor(() => {
        const dropdownItem = getAllByTestId("select-dropdown-item");

        expect(dropdownItem.length).toBe(1);
      });
    });

    it("Should display active style", () => {
      const { getByTestId } = render(
        <BoilStep
          isActive={true}
          item={mockedItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );

      const boilStep = getByTestId("boiling-step");

      expect(boilStep.props.style).toContainEqual(
        expect.objectContaining({
          borderColor: theme.color.primary,
          borderWidth: theme.border.bold,
        }),
      );
    });

    it("Should display addingTime error style", () => {
      const mockedErrorItem = {
        ...lodash.cloneDeep(mockedItem),
        isAddingTimeValid: false,
      };

      const { getByTestId } = render(
        <BoilStep
          isActive={true}
          item={mockedErrorItem}
          step={0}
          ingredientList={mockedIngredientsList}
          onChange={mockedOnChange}
        />,
      );

      const boilStep = getByTestId("boiling-step");

      expect(boilStep.props.style).toContainEqual(
        expect.objectContaining({
          borderWidth: theme.border.width,
          borderColor: theme.color.error,
          backgroundColor: theme.color.backgroundError,
        }),
      );
    });
  });
});
