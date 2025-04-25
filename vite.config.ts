/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
} as UserConfig);
