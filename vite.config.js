import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ViteSitemap from 'vite-plugin-sitemap'
import { sitemapPaths } from './src/routes/sitemapPaths'

export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
		ViteSitemap({
			hostname: 'https://www.sheetlypro.com',
			routes: sitemapPaths,
		}),
	],
})
