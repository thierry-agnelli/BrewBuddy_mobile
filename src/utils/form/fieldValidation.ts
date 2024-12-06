import { FormValues } from "@models";

/**
 * Field value validation.
 */
function fieldValidation(
  value: FormValues | undefined,
  regExp?: RegExp,
): { required: boolean; field: boolean } {
  // If value undefined
  if (!value) {
    return {
      required: true,
      field: true,
    };
  }

  // Check vs regex
  const isFieldError = !!regExp && !String(value).match(regExp);

  return {
    required: false,
    field: isFieldError,
  };
}

/* Exports */
export { fieldValidation };
