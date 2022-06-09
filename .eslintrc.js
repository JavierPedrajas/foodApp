module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "formatjs"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "warn",
    "no-duplicate-imports": "error",
    "no-empty-function": "warn",
    "@typescript-eslint/no-empty-function": ["off"],
    "formatjs/enforce-id": [
      "error",
      {
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
      },
    ],
  },
};
