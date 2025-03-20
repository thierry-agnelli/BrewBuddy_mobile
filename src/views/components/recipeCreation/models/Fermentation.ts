/**
 * Fermentation step.
 */
type FermentationStepData = {
  temperature: number;
  duration: number;
};

/**
 * Fermentation.
 */
type Fermentation = {
  primary: FermentationStepData;
  secondary: FermentationStepData;
  refermenting: FermentationStepData;
};

/* Exports */
export type { Fermentation, FermentationStepData };
