import { PayloadAction } from "@reduxjs/toolkit";

import { MashingRest } from "../../models";
import {
  RecipeState,
  MashingPayLoad,
  MashRestPayLoad,
} from "../models/RecipeState";

/**
 * Update mash out.
 */
function mashOutReducer(
  state: RecipeState,
  actions: PayloadAction<MashingPayLoad>,
) {
  const { mashing } = state;

  const { value } = actions.payload;

  mashing.mashOut = value;
}

/**
 * Multi mashing reducers.
 */

function multiMashRestReducer(
  state: RecipeState,
  actions: PayloadAction<MashingPayLoad>,
) {
  const { mashing } = state;

  const { value } = actions.payload;

  if (!value && mashing.mashRests[0]) mashing.mashRests.length = 1;
}

/**
 * Update mashing rests.
 */
function mashRestReducer<K extends keyof MashingRest>(
  state: RecipeState,
  actions: PayloadAction<MashRestPayLoad<K>>,
) {
  const { mashRests } = state.mashing;

  const { restKey, restIndex, value } = actions.payload;

  if (!mashRests[restIndex])
    mashRests.push({
      temperature: 0,
      duration: 0,
    });

  mashRests[restIndex][restKey] = value;
}

/* Exports */
export { mashOutReducer, multiMashRestReducer, mashRestReducer };
