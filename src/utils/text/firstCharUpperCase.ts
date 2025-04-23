/**
 * Convert first char to upper case.
 */

function firstCharUpperCase(text: string) {
  if (!text) return "";
  return text.length > 1
    ? text[0].toUpperCase() + text.slice(1, text.length).toLowerCase()
    : text[0].toUpperCase();
}

/* Exports */
export { firstCharUpperCase };
