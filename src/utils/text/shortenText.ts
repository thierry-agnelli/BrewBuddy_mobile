/**
 * Shorten text to max value length.
 */
function shortenText(text: string, value: number) {
  if (text.length > value) return text.slice(0, value) + "(...)";
  else return text;
}

/* Exports */
export { shortenText };
