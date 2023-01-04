module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist/*", "node_modules/*"],
  root: true,
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/ban-types": "off"
  }
};
