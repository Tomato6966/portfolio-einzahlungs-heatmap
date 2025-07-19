// vite.config.ts
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Must be the repository name
    base: '/portfolio-einzahlungs-heatmap/',
});
