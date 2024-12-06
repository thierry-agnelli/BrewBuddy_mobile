import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Storages utils
 */

/* Set */
async function setItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error setting item:", error);
  }
}

/* Get */
async function getItem(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting item:", error);
    return null;
  }
}

/* Remove */
async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error removing item:", error);
  }
}

// Storage
const storage = {
  setItem,
  getItem,
  removeItem,
};

/* Exports */
export { storage };
