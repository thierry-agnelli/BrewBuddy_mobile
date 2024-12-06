import { describe, expect, it, jest } from "@jest/globals";
import { storage } from "@utils";
import { mockedGetItem, mockedSetItem, mockedRemoveItem } from "@tests";

/**
 * Async storage utils.
 */
describe("AsyncStorage utils test", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(jest.fn());

  it("Should be defined", () => {
    expect(storage).toBeDefined();
  });

  describe("Tests", () => {
    it("Set item", async () => {
      await storage.setItem("key", "mockedItemValue");

      expect(mockedSetItem).toHaveBeenCalledWith("key", "mockedItemValue");
    });

    it("Set item error", async () => {
      mockedSetItem.mockRejectedValueOnce(null);

      await storage.setItem("key", "value");

      expect(consoleErrorSpy).toHaveBeenCalledWith("Error setting item:", null);
    });

    it("Get item", async () => {
      mockedGetItem.mockResolvedValueOnce("mockedItemValue");

      const itemValue = await storage.getItem("key");

      expect(mockedGetItem).toHaveBeenCalledWith("key");
      expect(itemValue).toBe("mockedItemValue");
    });

    it("Get item error", async () => {
      mockedGetItem.mockRejectedValueOnce(null);

      const itemValue = await storage.getItem("key");

      expect(itemValue).toBe(null);

      expect(consoleErrorSpy).toHaveBeenCalledWith("Error getting item:", null);
    });

    it("Remove item", async () => {
      await storage.removeItem("key");

      expect(mockedRemoveItem).toHaveBeenCalledWith("key");
    });

    it("Remove item error", async () => {
      mockedRemoveItem.mockRejectedValueOnce(null);

      await storage.removeItem("key");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error removing item:",
        null,
      );
    });
  });
});
