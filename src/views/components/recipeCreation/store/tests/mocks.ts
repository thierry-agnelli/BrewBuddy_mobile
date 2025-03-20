import { RecipeState } from "../models/RecipeState.ts";
import { IngredientsCategory, RecipeModel } from "@models";

const BASE_MOCKED_STATE: RecipeState = {
  beerProfile: {
    name: "Beer-test",
    description: "Mocked beer recipe",
    type: "NEIPA",
    ebc: 50,
    ibu: 50,
  },
  ingredients: {
    [IngredientsCategory.MALTS]: [],
    [IngredientsCategory.HOPS]: [],
    [IngredientsCategory.YEASTS]: [],
    [IngredientsCategory.MISCELLANEOUS]: [],
    [IngredientsCategory.SUGARS]: [],
  },
  mashing: {
    mashOut: false,
    mashRests: [],
  },
  boiling: {
    boilingSteps: [],
  },
  fermentation: {
    primary: {
      temperature: 19,
      duration: 3,
    },
    secondary: {
      temperature: 19,
      duration: 18,
    },
    refermenting: {
      temperature: 18,
      duration: 21,
    },
  },
};

const BASE_MOCKED_RECIPE_MODEL: RecipeModel = {
  profil: {
    name: BASE_MOCKED_STATE.beerProfile.name,
    description: BASE_MOCKED_STATE.beerProfile.description,
    ebc: BASE_MOCKED_STATE.beerProfile.ebc,
    ibu: BASE_MOCKED_STATE.beerProfile.ibu,
    style: BASE_MOCKED_STATE.beerProfile.type,
  },
  recipeIngredients: [
    {
      category: IngredientsCategory.MALTS,
      ingredients: [],
    },
    {
      category: IngredientsCategory.HOPS,
      ingredients: [],
    },
    {
      category: IngredientsCategory.YEASTS,
      ingredients: [],
    },
    {
      category: IngredientsCategory.MISCELLANEOUS,
      ingredients: [],
    },
    {
      category: IngredientsCategory.SUGARS,
      ingredients: [],
    },
  ],
  steps: {
    mashing: {
      multiStage: false,
      steps: [],
    },
    boiling: [],
    fermenting: {
      totalDurationOfBaseFermenting: 21,
      steps: [
        {
          name: "primary",
          temperature: 19,
          duration: 3,
        },
        {
          name: "secondary",
          temperature: 19,
          duration: 18,
        },
        {
          name: "refermenting",
          temperature: 18,
          duration: 21,
        },
      ],
    },
  },
};

/* Exports */
export { BASE_MOCKED_STATE, BASE_MOCKED_RECIPE_MODEL };
