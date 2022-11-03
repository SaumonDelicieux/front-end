module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    root: true,
    files: ["*.ts", "*.tsx"],
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
        project: "./tsconfig.json",
    },
    plugins: ["react", "import", "@typescript-eslint", "prettier"],
    rules: {
        "react/jsx-indent": ["warn", 4],
        "linebreak-style": "off",
        "import/no-unresolved": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/no-unescaped-entities": "off",
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto",
                singleQuote: false,
            },
        ],
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: "./tsconfig.json",
            },
        },
        react: {
            version: "detect",
        },
    },
}
