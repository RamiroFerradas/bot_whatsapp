module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      files: ["*.js"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      env: {
        browser: true,
      },
    },
    {
      files: ["*.cjs"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
      },
      env: {
        node: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  globals: {
    process: "readonly",
  },
  rules: {
    // indent: ["error", 2],
    "linebreak-style": ["off", "unix"],
    quotes: ["off"],
    semi: ["off", "never"],
    "no-unused-vars": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".cjs"],
      },
    },
  },
};
