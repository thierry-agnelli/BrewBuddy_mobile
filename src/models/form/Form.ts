/**
 * Form
 */
type Form = Record<string, FormValues>;

/**
 * Form Values.
 */
type FormValues = string | boolean;

/**
 * FormProps
 */
type FormProps<P> = P & { name: string };

/* Exports */
export type { Form, FormProps, FormValues };
