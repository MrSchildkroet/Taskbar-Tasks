import { eslint } from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      //  const/let, nie var
      "no-var": "error",
      "prefer-const": "error",

      //  kein any > unknown + narrowing
      "@typescript-eslint/no-explicit-any": "error",

      // async/await, keine .then()-Chains
      // (nur teilweise per Lint; Promise-Misuse wird erkannt)
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",

      // import type erzwingen
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // public accessor erzwingen
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit" },
      ],

      // interface für Objekte, type für Unions
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // explizite Rückgabetypen auf exportierten Funktionen
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // Naming: PascalCase Typen, camelCase Vars, SCREAMING für const-Literale
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "typeLike", format: ["PascalCase"] },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        { selector: "function", format: ["camelCase"] },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
      ],

      // ungenutzte Vars (mit _ als Opt-out)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // kein console.log (du hast einen Logger)
      "no-console": "warn",

      // Blank Line vor Control Flow
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: ["if", "for", "while", "switch", "try"],
        },
      ],
    },
  },
);
