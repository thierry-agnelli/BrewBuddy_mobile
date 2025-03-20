import { recipeStore } from "../../store/store.ts";

/**
 * Check beer profile.
 */
function checkBeerProfile() {
  const { beerProfile } = recipeStore.getState();

  let isBeerProfileValid = true;

  for (const beerProfileKey in beerProfile) {
    const profileElement =
      beerProfile[beerProfileKey as keyof typeof beerProfile];

    if (typeof profileElement !== "number")
      isBeerProfileValid &&= !!profileElement;
  }

  return isBeerProfileValid;
}

/* Exports */
export { checkBeerProfile };
