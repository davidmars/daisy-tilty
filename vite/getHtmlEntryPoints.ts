import { readdirSync } from 'fs'
import { resolve } from 'path'

/**
 * Scans all .html files at the root of the project
 * and returns a record usable by rollupOptions.input
 */
export function getHtmlEntryPoints(rootDir: string = process.cwd()): Record<string, string> {
    const files = readdirSync(resolve(rootDir), { withFileTypes: true })
    const entries: Record<string, string> = {}

    for (const file of files) {
        if (file.isFile() && file.name.endsWith('.html')) {
            const name = file.name.replace(/\.html$/, '')
            entries[name] = resolve(rootDir, file.name)
        }
    }

    return entries
}
