module.exports = {
  root: false,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "@react-native",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-native", "@typescript-eslint", "prettier"],
  ignorePatterns: ["*.config.*", "**/reports/**"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "class",
        format: ["PascalCase"],
        leadingUnderscore: "forbid",
      },
    ],
    "max-len": "error",
    "no-console": "warn",
    "no-debugger": "warn",
  },
};
