import { StyleProps } from "@models";

/* Models */
type FormErrorClasses = Record<
  string,
  {
    requiredError: StyleProps<unknown>;
    fieldError: StyleProps<unknown>;
  }
>;

/* Exports */
export type { FormErrorClasses };
