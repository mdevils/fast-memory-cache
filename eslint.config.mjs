import eslint from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-non-null-assertion": "off",
            "no-irregular-whitespace": "off",
            "no-control-regex": "off",
            "no-duplicate-imports": ["error", {"includeExports": true}],
            "arrow-body-style": ["error", "as-needed"],
            "no-restricted-globals": ["error", "name", "toString", "pending"]
        },
        ignores: ["dist"]
    }
);
