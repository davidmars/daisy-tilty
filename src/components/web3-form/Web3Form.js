/**
 * Codes d'erreur du composant Web3Form.
 * Pour la signification de chaque code, consulter `_docs/codes-erreur.md`.
 * @enum {string}
 */
const WEB3FORM_ERRORS = {
    MISSING_KEY:  'ERR-xWF01',
    SUBMIT_ERROR: 'ERR-xWF02',
};

/**
 * Composant Alpine.js pour les formulaires Web3Forms.
 * Injecte la clé d'accès et soumet via fetch (AJAX) sans rechargement de page.
 *
 * La validation des champs est entièrement gérée par les attributs HTML5
 * (`required`, `type="email"`, etc.) et le système `.validator` de DaisyUI.
 * Alpine intervient uniquement pour :
 *   - bloquer la soumission si le formulaire est invalide (`checkValidity`)
 *   - gérer le spinner de chargement
 *   - afficher le message de succès et l'erreur de soumission
 *
 * @example
 * // main.js
 * Alpine.data('web3Forms', () => new Web3Form());
 *
 * @example
 * <!-- HTML -->
 * <form x-data="web3Forms" x-on:submit="handleSubmit">
 *     <input type="hidden" name="access_key" x-bind:value="accessKey">
 * </form>
 */
export class Web3Form {
    constructor() {
        /**
         * Clé d'accès Web3Forms, lue depuis la variable d'environnement Vite.
         * @type {string}
         */
        this.accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? '';

        /**
         * Indique si la clé d'accès Web3Forms est absente.
         * @type {boolean}
         */
        this.keyMissing = !this.accessKey;

        /**
         * Code d'erreur affiché si la clé est absente.
         * @type {string}
         */
        this.keyErrorCode = this.keyMissing ? WEB3FORM_ERRORS.MISSING_KEY : '';

        /**
         * Indique si la soumission est en cours.
         * @type {boolean}
         */
        this.loading = false;

        /**
         * Indique si la soumission a réussi.
         * @type {boolean}
         */
        this.success = false;

        /**
         * Code d'erreur affiché si la soumission échoue.
         * Vide si aucune erreur de soumission n'est en cours.
         * @type {string}
         */
        this.submitError = '';
    }

    /**
     * Durée d'affichage du message de succès avant retour au formulaire (en ms).
     * @type {number}
     */
    static SUCCESS_DISPLAY_DURATION = 5000;

    /**
     * Initialise le composant (appelé automatiquement par Alpine.js).
     * @returns {void}
     */
    init() {
        if (this.keyMissing) {
            console.warn('La clé Web3Forms est absente. Ajoutez `VITE_WEB3FORMS_ACCESS_KEY` dans un fichier .env.local.');
        }
    }

    /**
     * Soumet le formulaire via fetch (AJAX) vers l'API Web3Forms.
     * Délègue la validation des champs à l'HTML5 via `checkValidity()`.
     * À lier via `x-on:submit="handleSubmit"` sur l'élément `<form>`.
     * @param {Event} event
     * @returns {Promise<void>}
     */
    async handleSubmit(event) {
        event.preventDefault();

        this.submitError = '';
        this.success = false;

        if (this.keyMissing) return;
        if (!event.target.checkValidity()) return;

        this.loading = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(event.target),
            });

            const data = await response.json();

            if (response.ok) {
                this.success = true;
                event.target.reset();
                setTimeout(() => { this.success = false; }, Web3Form.SUCCESS_DISPLAY_DURATION);
            } else {
                this.submitError = WEB3FORM_ERRORS.SUBMIT_ERROR;
                console.error('Web3Forms — erreur de soumission :', data.message);
            }
        } catch (error) {
            this.submitError = WEB3FORM_ERRORS.SUBMIT_ERROR;
            console.error('Web3Forms — erreur réseau :', error);
        } finally {
            this.loading = false;
        }
    }
}
