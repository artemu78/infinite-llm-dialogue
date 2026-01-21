import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { version } from "./package.json";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log({mode});
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "production" && sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "artem-reva",
        project: "javascript-react",
      }),
    ].filter(Boolean),
    define: {
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(version),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});
