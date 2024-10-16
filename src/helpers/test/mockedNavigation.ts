import { jest } from "@jest/globals";
import { DrawerNavigationProp } from "@react-navigation/drawer";

/**
 * Mocked navigation object.
 */

const mockedNavigation: DrawerNavigationProp<Record<string, undefined>> = {
  goBack: jest.fn(),
  navigate: jest.fn(),
} as unknown as DrawerNavigationProp<Record<string, undefined>>;

/* Exports */
export { mockedNavigation };
