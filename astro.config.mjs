// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

import mdx from "@astrojs/mdx";

import playformInline from "@playform/inline";

// https://astro.build/config
export default defineConfig({
	site: "https://astropie.netlify.app",
	base: "/",
	// trailingSlash: 'always',
	integrations: [
		svelte(),
		tailwind(),
		alpinejs(),
		mdx(),
		(await import("@playform/inline")).default({
			Critters: true,
		}),
	],
	output: "static",
	devToolbar: {
		enabled: false,
	},
// 	experimental: {
// 		svg: true,
// 	},
	vite: {
          server: {
              proxy: {
                '/api': {
                  target: 'https://dunhayat.coffee',
                  changeOrigin: true,
                  secure: true,
                  rewrite: (path) => path.replace(/^\/api/, '/api'),
                },
              },
            },
		build: {
			assetsDir: 'assets',
			rollupOptions: {
				output: {
					assetFileNames: 'assets/[name].[hash].[ext]'
				}
			}
		},
		assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.avif']
	}
});
