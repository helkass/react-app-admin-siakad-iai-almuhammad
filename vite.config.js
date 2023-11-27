import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(),reactRefresh(), pluginRewriteAll()],
   server: {
      watch: {
         usePolling: true,
      },
   },
});
