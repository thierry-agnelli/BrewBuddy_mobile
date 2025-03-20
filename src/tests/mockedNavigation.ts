import { jest } from "@jest/globals";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "@models";

/**
 * Mocked navigation object.
 */

const mockedNavigation: DrawerNavigationProp<DrawerParamList> = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  setOptions: jest.fn(),
} as unknown as DrawerNavigationProp<DrawerParamList>;

/* Exports */
export { mockedNavigation };
