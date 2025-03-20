import { checkBeerProfile } from "./methods";

/**
 * Check recipe utils.
 */
function checkRecipeCreation(): boolean {
  return checkBeerProfile();
}

/* Exports */
export { checkRecipeCreation };
