import { jest } from "@jest/globals";

const mockedGetItem = jest.fn<() => Promise<string | null>>();
const mockedSetItem = jest.fn<() => Promise<string | null>>();
const mockedRemoveItem = jest.fn<() => Promise<string | null>>();

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: mockedGetItem,
  setItem: mockedSetItem,
  removeItem: mockedRemoveItem,
}));

/* Exports */
export { mockedGetItem, mockedSetItem, mockedRemoveItem };
