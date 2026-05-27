import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: [
        "node_modules/", 
        "src/tests/setup.ts", 
        "**/*.d.ts", 
        "src/app/layout.tsx", 
        "src/app/api-docs/page.tsx",
        "src/lib/mongodb.ts" // Hard to test singleton connection
      ],
    },
    server: {
      deps: {
        inline: [/@exodus\/bytes/],
      },
    },
  },
});
