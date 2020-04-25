module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "graphql",
    "import",
    "json",
    "react",
    "react-hooks",
    "simple-import-sort",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",

    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/camelcase": "off",

    "import/default": "off",
    "import/order": "off",
    "import/no-duplicates": "error",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    "import/named": "off",
    "import/namespace": "off",



    // "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
    // "no-unused-vars": "off",
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "error",
    "simple-import-sort/sort": "off",
    "sort-imports": "off",
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
};
