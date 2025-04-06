import { Ingredient } from "@models";
import {
  BeerProfile,
  RecipeIngredient,
  RecipeIngredients,
  Mashing,
  MashingRest,
  Boiling,
  BoilingStep,
  Fermentation,
  FermentationStepData,
  DraggableItemProps,
} from "../../models";

/**
 * Initial recipe store state.
 */
type RecipeState = {
  beerProfile: BeerProfile;
  ingredients: RecipeIngredients;
  mashing: Mashing;
  boiling: Boiling;
  fermentation: Fermentation;
};

/**
 * Beer profile payload.
 */
type BeerProfilePayload<K extends keyof BeerProfile> = {
  beerProfileKey: K;
  value: BeerProfile[K];
};

/**
 * Ingredient payload.
 */
type IngredientPayLoad<K extends keyof RecipeIngredient> = {
  ingredientIndex: number;
  ingredientKey: K;
  value: RecipeIngredient[K];
  // ingredientModel: RecipeIngredient;
  ingredientModel: Ingredient;
};

/**
 * Mash out payload.
 */
type MashingPayLoad = {
  value: boolean;
};

/**
 * Mash rest payload.
 */
type MashRestPayLoad<K extends keyof MashingRest> = {
  restKey: K;
  restIndex: number;
  value: MashingRest[K];
};

/**
 * Boiling payload.
 */
type BoilingPayLoad = {
  value: DraggableItemProps[];
};

/**
 * Boiling step payload.
 */
type BoilingStepPayLoad<K extends keyof BoilingStep> = {
  boilingKey: K;
  stepIndex: number;
  ingredient: RecipeIngredient;
  value: BoilingStep[K];
};

/**
 * Fermentation payload.
 */
type FermentationPayLoad<
  S extends keyof Fermentation,
  K extends keyof FermentationStepData,
> = {
  step: S;
  fermentationKey: K;
  value: FermentationStepData[K];
};

/* Exports */
export type {
  RecipeState,
  BeerProfilePayload,
  IngredientPayLoad,
  MashingPayLoad,
  MashRestPayLoad,
  BoilingPayLoad,
  BoilingStepPayLoad,
  FermentationPayLoad,
};
