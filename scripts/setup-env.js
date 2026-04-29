/**
 * Script de post-installation.
 * Génère les fichiers d'environnement locaux (non versionnés) à partir
 * des fichiers versionnés correspondants utilisés comme modèles.
 *
 * Exemple :
 *   .env.development  →  .env.development.local  (si absent)
 *   .env.production   →  .env.production.local   (si absent)
 *
 * Les fichiers existants ne sont jamais écrasés.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();

/**
 * @typedef {{ source: string, target: string }} EnvPair
 * @type {EnvPair[]}
 */
const ENV_PAIRS = [
    { source: '.env.development', target: '.env.development.local' },
    { source: '.env.production',  target: '.env.production.local'  },
];

/**
 * Ajoute un en-tête d'avertissement au contenu d'un fichier modèle.
 * @param {string} sourceFile - Nom du fichier source.
 * @param {string} content    - Contenu du fichier source.
 * @returns {string}
 */
function addLocalHeader(sourceFile, content) {
    return [
        `# Fichier local généré depuis \`${sourceFile}\` — NON versionné (voir .gitignore)`,
        `# Renseignez les valeurs sensibles ci-dessous. Ce fichier ne sera jamais commité.`,
        '',
        content.trimEnd(),
        '',
    ].join('\n');
}

let created = 0;

for (const { source, target } of ENV_PAIRS) {
    const sourcePath = resolve(ROOT, source);
    const targetPath = resolve(ROOT, target);

    if (existsSync(targetPath)) {
        console.log(`  ⏭  ${target} existe déjà — ignoré.`);
        continue;
    }

    if (!existsSync(sourcePath)) {
        console.warn(`  ⚠️  ${source} introuvable — ${target} non créé.`);
        continue;
    }

    const sourceContent = readFileSync(sourcePath, 'utf-8');
    writeFileSync(targetPath, addLocalHeader(source, sourceContent), 'utf-8');
    console.log(`  ✅ ${target} créé depuis ${source}.`);
    created++;
}

if (created > 0) {
    console.log('');
    console.log('  ⚠️  Action requise :');
    console.log('  Renseignez les variables sensibles dans les fichiers .local créés.');
    console.log('  Obtenez votre clé Web3Forms sur https://web3forms.com');
    console.log('');
}
