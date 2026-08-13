"use strict";

const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
    {
        ignores: ["dist/**", "node_modules/**", "coverage/**"],
    },
    ...tseslint.configs.recommended,
    {
        rules: {
            // Roughly mirrors the previous tslint.json ruleset.
            "no-eval": "error",
            "no-var": "error",
            "eqeqeq": ["error", "always", { null: "ignore" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
            "@typescript-eslint/no-empty-function": "off",
        },
    }
);
