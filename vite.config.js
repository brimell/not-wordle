import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
// https://realfavicongenerator.net/
export default defineConfig({
	plugins: [react(), VitePWA({
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Not Wordle',
      short_name: 'Not Wordle',
      description: 'Wordle. But Multiplayer',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        }
      ]
    }
    
  })],
	publicDir: "./public",
	base: "/",
	build: {
		outDir: "build",
		cssCodeSplit: true,
		sourcemap: false,
	},
});
