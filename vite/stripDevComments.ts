import type { Plugin } from 'vite'

/**
 * Plugin Vite : supprime les commentaires de développement du HTML produit au build.
 *
 * Convention : utiliser `<!---` (3 tirets) pour les commentaires internes
 * aux composants et molécules. Ces commentaires sont valides en HTML
 * (les navigateurs les ignorent) mais ne doivent jamais être livrés en production.
 *
 * Exemples ciblés :
 *   <!--- Commentaire supprimé au build -->
 *   <!---
 *     Bloc multi-lignes supprimé au build
 *   -->
 *
 * Non ciblés (conservés) :
 *   <!-- Commentaire HTML classique -->
 */
export default function stripDevComments(): Plugin {
    return {
        name: 'strip-dev-comments',
        enforce: 'post',
        transformIndexHtml: {
            order: 'post',
            handler(html, ctx) {
                // Suppression uniquement au build (ctx.server est défini en dev)
                if (!ctx.server) {
                    return html.replace(/<!---[\s\S]*?-->/g, '')
                }
                return html
            },
        },
    }
}

