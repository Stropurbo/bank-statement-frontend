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
			routes: sitemapPaths.map(path => path.trim()),
			generateRobotsTxt: true,
		}),
	],
	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					router: ['react-router', 'react-router-dom'],
				},
			},
		},
	},
})
