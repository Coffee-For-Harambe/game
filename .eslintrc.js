module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
}
