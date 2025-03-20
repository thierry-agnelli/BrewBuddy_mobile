import { Keyboard } from "react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as ReducersModule from "../../store/store.ts";

import { BeerProfile } from "./BeerProfile.tsx";

/**
 * BeerProfile component test.
 */

describe("BeerProfile component test", () => {
  it("Should be defined", () => {
    expect(BeerProfile).toBeDefined();
  });

  describe("Tests", () => {
    it("Should render", () => {
      const { getByTestId } = render(<BeerProfile />);

      const beerProfile = getByTestId("beer-profile");
      expect(beerProfile).toBeDefined();
    });

    it("Should set recipe creation store", async () => {
      // Spies
      const updateBeerProfileSpy = jest.spyOn(
        ReducersModule,
        "updateBeerProfile",
      );
      const mockedMeasureInWindow = jest.fn().mockImplementation((callback) => {
        (callback as (x: number, y: number, h: number, w: number) => void)(
          1,
          2,
          10,
          20,
        );
      });

      const { getByTestId, getAllByTestId } = render(<BeerProfile />);

      // Beer name
      const nameInput = getByTestId("beer-name-input");
      await fireEvent.changeText(nameInput, "test-name");
      expect(updateBeerProfileSpy).toHaveBeenCalledWith({
        beerProfileKey: "name",
        value: "test-name",
      });

      // ebc
      const ebcSlider = getByTestId("ebc-base-slider");
      await fireEvent.call(20, ebcSlider, "onValueChange");
      expect(updateBeerProfileSpy).toHaveBeenCalledWith({
        beerProfileKey: "ebc",
        value: undefined,
      });

      // ibu
      const ibuSlider = getByTestId("ibu-base-slider");
      await fireEvent.call(20, ibuSlider, "onValueChange");
      expect(updateBeerProfileSpy).toHaveBeenCalledWith({
        beerProfileKey: "ibu",
        value: undefined,
      });

      // Beer type
      const beerTypeSelect = getByTestId("select-input");
      beerTypeSelect!.parent!.instance.measureInWindow = mockedMeasureInWindow;

      await fireEvent.press(beerTypeSelect);

      await waitFor(() => {
        const beerTypeItems = getAllByTestId("select-dropdown-item");
        fireEvent.press(beerTypeItems[0]);
        expect(updateBeerProfileSpy).toHaveBeenCalledWith({
          beerProfileKey: "type",
          value: "Pils",
        });
      });

      // Beer description
      const descriptionInput = getByTestId("description-input");
      await fireEvent.changeText(descriptionInput, "test-description");
      expect(updateBeerProfileSpy).toHaveBeenCalledWith({
        beerProfileKey: "description",
        value: "test-description",
      });
    });

    it("Should close keyboard", async () => {
      const keyboardDismissSpy = jest.spyOn(Keyboard, "dismiss");

      const { getByTestId } = render(<BeerProfile />);

      const beerProfile = getByTestId("beer-profile");
      fireEvent.press(beerProfile);

      await waitFor(() => {
        expect(keyboardDismissSpy).toHaveBeenCalled();
      });
    });
  });
});
