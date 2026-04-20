import { defineConfig } from 'vite'
import htmlInclude from 'vite-plugin-html-include'
import { getHtmlEntryPoints } from './vite/getHtmlEntryPoints.js'
import viteAutoImportScss from "./vite/viteAutoImportScss";
import iconsGalleryPlugin from "./vite/iconsGalleryPlugin";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    base: './',
    plugins: [
        // Plugin to include HTML files in the build process with slots and variables
        htmlInclude(),
        // Automatically import all SCSS files from specified directories
        viteAutoImportScss([
            {
                inputDir: 'src/components/**/*.scss',
                outputFile: 'src/styles/components-all.scss'
            },
            {
                inputDir: 'src/layout/**/*.scss',
                outputFile: 'src/styles/layout-all.scss'
            }
        ]),
        // Plugin to generate an icons gallery HTML file
        iconsGalleryPlugin({
            dirs: ['src/icons'],
            output: 'icons-gallery.html'
        })
    ],
    build: {
        rollupOptions: {
            input: getHtmlEntryPoints()
        }
    },
    resolve: {
        alias: {
            '@comp': fileURLToPath(new URL('./src/components/', import.meta.url)),
            '@layout': fileURLToPath(new URL('./src/layout/', import.meta.url)),
            '@icons': fileURLToPath(new URL('./src/icons/', import.meta.url)),
            '@style': fileURLToPath(new URL('./src/styles/', import.meta.url)),
            // ...others alias
        }
    }
})
