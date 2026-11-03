import { defineConfig } from "vitest/config";

// The downstream contract check runs separately from the unit tests: `npm run ci:contract`.
export default defineConfig({
  test: {
    include: ["contract/**/*.contract.ts"],
  },
});
