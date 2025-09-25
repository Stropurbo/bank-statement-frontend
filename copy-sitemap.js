import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.join(__dirname, 'public', 'sitemap.xml')
const dest = path.join(__dirname, 'dist', 'sitemap.xml')

fs.copyFileSync(src, dest)
console.log('Sitemap copied to dist folder!')
