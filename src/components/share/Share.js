/**
 * Composant Alpine.js pour le partage natif via la Web Share API.
 * Affiche un toast de confirmation si le partage ou la copie réussit.
 */
export class Share {
    constructor() {
        /** @type {string} Titre de l'article à partager (depuis la balise <title> ou la prop). */
        this.title = document.title;

        /** @type {string} URL de la page courante à partager. */
        this.url = window.location.href;

        /** @type {boolean} Indique si la Web Share API est disponible dans le navigateur. */
        this.canShare = typeof navigator.share === 'function';

        /** @type {boolean} Indique si le toast de confirmation est visible. */
        this.copied = false;

        /** @type {number|null} Identifiant du timer de masquage du toast. */
        this._timer = null;
    }

    /**
     * Déclenche le partage natif ou copie l'URL dans le presse-papiers en fallback.
     * @returns {Promise<void>}
     */
    async shareArticle() {
        if (this.canShare) {
            try {
                await navigator.share({
                    title: this.title,
                    url: this.url,
                });
            } catch (/** @type {unknown} */ err) {
                // L'utilisateur a annulé — pas d'erreur à remonter.
                if (err instanceof Error && err.name !== 'AbortError') {
                    await this._copyFallback();
                }
            }
        } else {
            await this._copyFallback();
        }
    }

    /**
     * Copie l'URL courante dans le presse-papiers et affiche un toast de confirmation.
     * @returns {Promise<void>}
     */
    async _copyFallback() {
        try {
            await navigator.clipboard.writeText(this.url);
            this._showToast();
        } catch {
            // Clipboard non disponible — rien à faire.
        }
    }

    /**
     * Affiche le toast de confirmation pendant 2 secondes.
     * @returns {void}
     */
    _showToast() {
        this.copied = true;
        if (this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.copied = false;
        }, 2000);
    }
}

