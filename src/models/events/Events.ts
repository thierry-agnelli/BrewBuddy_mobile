/**
 * Change event.
 */
type EventValue = string | boolean;

type ChangeEvent = {
  value: EventValue;
  name?: string;
};

/**
 * Change TextInput event type.
 */
type ChangeTextEvent = ChangeEvent & {
  value: string;
};

/**
 * Change Checkbox event.
 */
type ChangeCheckBoxEvent = ChangeEvent & {
  value: boolean;
};

/* Exports */
export type { ChangeEvent, ChangeCheckBoxEvent, ChangeTextEvent, EventValue };
