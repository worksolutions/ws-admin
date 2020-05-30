module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    "jest/globals": true,
  },
  extends: [
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["jest", "react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.test.ts"],
      rules: {
        "max-lines": 0,
      },
    },
  ],
  rules: {
    "max-lines": ["error", 300],
    "max-lines-per-function": ["error", { max: 30 }],
    "max-params": ["error", 3],
    "complexity": ["error", 20],
    "no-useless-constructor": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "react/display-name": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "react/no-find-dom-node": 0,
    "react/jsx-curly-brace-presence": 2,
    "react/prop-types": 0,
    "@typescript-eslint/adjacent-overload-signatures": 0,
    "@typescript-eslint/no-empty-function": 0,
  },
};
