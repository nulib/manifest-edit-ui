module.exports = {
  plugins: ["@typescript-eslint", "testing-library"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier", "react-app"],
  rules: {
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
  },
};
