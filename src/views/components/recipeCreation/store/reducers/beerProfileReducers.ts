import { PayloadAction } from "@reduxjs/toolkit";

import { RecipeState, BeerProfilePayload } from "../models/RecipeState";
import { BeerProfile } from "../../models";

/**
 * Update beer profile.
 */
function beerProfileReducer<K extends keyof BeerProfile>(
  state: RecipeState,
  actions: PayloadAction<BeerProfilePayload<K>>,
) {
  const { beerProfileKey, value } = actions.payload;
  state.beerProfile[beerProfileKey] = value;
}

/* Exports */
export { beerProfileReducer };
