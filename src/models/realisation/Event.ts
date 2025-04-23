/**
 * Event status.
 */
enum EventStatus {
  PENDING = "PENDGIN",
}

/**
 * Event.
 */
type Event<D extends object | undefined = undefined> = {
  name: string;
  data: D extends object ? D : never;
  recipeID: string;
  order: number;
  desc: string;
};

/**
 * Realisation event.
 */
type RealisationEvent<D extends object | undefined = undefined> = {
  status: EventStatus;
  event: Event<D>;
};

/* Exports */
export type { RealisationEvent };
