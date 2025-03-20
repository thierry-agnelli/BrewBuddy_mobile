/**
 * Pour first char to upper case.
 */

function firstCharUpperCase(text: string) {
  return text[0].toUpperCase() + text.slice(1, text.length);
}

/* Exports */
export { firstCharUpperCase };
