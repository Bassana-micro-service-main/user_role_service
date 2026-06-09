import { defineConfig } from "vitest/config";
import { config } from "dotenv";
import { resolve } from "path";

if (!process.env.DATABASE_URL) {
  config({ path: resolve(__dirname, ".env.test") });
}

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.{spec,test}.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
});
