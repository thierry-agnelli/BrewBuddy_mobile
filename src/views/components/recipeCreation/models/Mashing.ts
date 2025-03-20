/**
 * Mashing rest.
 */
type MashingRest = {
  temperature: number;
  duration: number;
};

/**
 * Mashing.
 */
type Mashing = {
  mashRests: MashingRest[];
  mashOut: boolean;
};

/* Exports */
export type { Mashing, MashingRest };
