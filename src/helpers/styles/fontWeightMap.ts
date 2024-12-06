/* Font weight mapping from style property to font name */
const fontWeightMap = new Map();

// Setting keys/values.

fontWeightMap.set(100, "Thin");
fontWeightMap.set("100", "Thin");
fontWeightMap.set(300, "Light");
fontWeightMap.set("300", "Light");
fontWeightMap.set(undefined, "Regular");
fontWeightMap.set(400, "Regular");
fontWeightMap.set("400", "Regular");
fontWeightMap.set(500, "Medium");
fontWeightMap.set("500", "Medium");
fontWeightMap.set(700, "Bold");
fontWeightMap.set("700", "Bold");
fontWeightMap.set("bold", "Bold");
fontWeightMap.set(900, "Black");
fontWeightMap.set("900", "Black");

/* Exports */
export { fontWeightMap };
