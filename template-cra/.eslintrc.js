module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "serviceworker": true,
    "jest": true,
  },
  "extends": [
    "react-app",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "plugins": ["react-hooks", "prettier"],
  "rules": {
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/camelcase": ["error", {"allow": ["__webpack_public_path__"]}],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
      },
    ],
    "max-len": [
      2,
      {
        "code": 120,
        "ignoreUrls": true,
      },
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "objectsInObjects": false,
        "arraysInObjects": false,
      },
    ],
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "prettier/prettier": "error",
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": false,
      }
    }],
    "import/no-unresolved": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};