import { describe, expect, it, jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { mocksNavigation, mocksRoute } from "@tests";
import { Routes, UserRoles } from "@models";
import { AppContextValues } from "@components";
import { useAppContext } from "@hooks";
import * as getUserModule from "../../../services/users/getUser";

import { Home } from "./Home";

/**
 *  Home view test.
 */
describe("Home view test", () => {
  // Should be defined
  it("Should be defined", () => {
    expect(Home).toBeDefined();
  });

  describe("Tests", () => {
    const mockedNavigation = mocksNavigation<Routes.HOME>();
    const mockedRoute = mocksRoute<Routes.HOME>();

    it("Should render", () => {
      const { getByTestId } = render(
        <Home navigation={mockedNavigation} route={mockedRoute} />,
      );

      const content = getByTestId("home-view");

      expect(content).toBeDefined();
    });

    it("Should call navigate navigation method", () => {
      const { getByTestId } = render(
        <Home navigation={mockedNavigation} route={mockedRoute} />,
      );

      const button = getByTestId("navigate-button");

      fireEvent.press(button);

      expect(mockedNavigation.navigate).toHaveBeenCalledWith(
        Routes.LEXICON,
        {},
      );
    });

    it("Should getUser", async () => {
      jest.spyOn(getUserModule, "getUser").mockResolvedValue({
        id: 0,
        email: "test@test.com",
        pseudo: "test-user",
        iat: 0,
        role: "USER",
      });

      let context: AppContextValues;

      const TestHomeComponent = () => {
        context = useAppContext();
        return <Home navigation={mockedNavigation} route={mockedRoute} />;
      };

      render(<TestHomeComponent />);

      await waitFor(() => {
        expect(context.user).toStrictEqual({
          id: 0,
          email: "test@test.com",
          pseudo: "test-user",
          iat: 0,
          role: UserRoles.USER,
          roleName: "USER",
        });
      });
    });
  });
});
