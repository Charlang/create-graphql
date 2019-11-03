module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "serviceworker": true,
        "jest": true,
    },
    "extends": ["plugin:@typescript-eslint/recommended", "google", "prettier", "plugin:security/recommended"],
    "parserOptions": {
        // ecmaVersion 2018 (same as 9)
        "ecmaVersion": 9,
        // sourceType - set to "script" (default) or "module" if your code is in ECMAScript modules
        "sourceType": "module",
        // enable global strict mode
        "impliedStrict": true,
    },
    "plugins": ["prettier", "security"],
    "rules": {
        // make SwitchCase tight
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
                // enforces a maximum line length to 120 since we all have big screen
                "code": 120,
                // ignores lines that contain a URL
                "ignoreUrls": true,
            },
        ],
        "object-curly-spacing": [
            "error",
            // requires spacing inside of braces, but still make object tight as below
            "always",
        ],
        // Still enable console, left it to developer's best judgement
        "no-console": "off",
        "require-jsdoc": 0,
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-ignore": false,
        "@typescript-eslint/camelcase": {
            "allow": ["create_time", "last_update", "account_id"],
        },
        "@typescript-eslint/interface-name-prefix": "always",
        "prettier/prettier": "error",
        "security/detect-child-process": "off",
        "security/detect-object-injection": "off",
    },
};