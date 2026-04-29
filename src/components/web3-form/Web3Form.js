/**
 * Codes d'erreur du composant Web3Form.
 * Pour la signification de chaque code, consulter `_docs/codes-erreur.md`.
 * @enum {string}
 */
const WEB3FORM_ERRORS = {
    MISSING_KEY: 'ERR-xWF01',
};

/**
 * Composant Alpine.js pour les formulaires Web3Forms.
 * Injecte la clé d'accès, valide les champs requis et gère la soumission.
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
         * Messages d'erreur par nom de champ.
         * @type {Record<string, string>}
         */
        this.errors = {};

        /**
         * Indique si le formulaire a déjà été soumis une fois (active l'affichage des erreurs).
         * @type {boolean}
         */
        this.submitted = false;

        /**
         * Indique si la clé d'accès Web3Forms est absente.
         * Utilisé pour afficher une alerte dans le formulaire dès le chargement.
         * @type {boolean}
         */
        this.keyMissing = !this.accessKey;

        /**
         * Code d'erreur affiché dans l'interface si la clé est absente.
         * Vide si la clé est présente.
         * @type {string}
         */
        this.keyErrorCode = this.keyMissing ? WEB3FORM_ERRORS.MISSING_KEY : '';
    }

    /**
     * Initialise le composant (appelé automatiquement par Alpine.js).
     * Émet un avertissement en console si la clé d'accès est absente.
     * @returns {void}
     */
    init() {
        if (this.keyMissing) {
            console.warn('La clé Web3Forms est absente. Ajoutez `VITE_WEB3FORMS_ACCESS_KEY` dans un fichier .env.local.');
        }
    }

    /**
     * Valide tous les champs du formulaire.
     * Remplit `this.errors` avec les messages d'erreur par nom de champ.
     * @param {HTMLFormElement} form
     * @returns {boolean} `true` si le formulaire est valide.
     */
    validate(form) {
        this.errors = {};

        const rules = [
            { name: 'prenom',      label: 'Le prénom' },
            { name: 'nom',         label: 'Le nom' },
            { name: 'email',       label: "L'e-mail" },
            { name: 'sujet',       label: 'Le sujet' },
            { name: 'message',     label: 'Le message' },
            { name: 'consentement', label: 'Le consentement', type: 'checkbox' },
        ];

        for (const rule of rules) {
            const field = form.elements[rule.name];
            if (!field) continue;

            if (rule.type === 'checkbox') {
                if (!field.checked) {
                    this.errors[rule.name] = 'Vous devez accepter pour continuer.';
                }
                continue;
            }

            if (!field.value.trim()) {
                this.errors[rule.name] = `${rule.label} est obligatoire.`;
                continue;
            }

            if (rule.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                this.errors[rule.name] = "L'adresse e-mail n'est pas valide.";
            }
        }

        return Object.keys(this.errors).length === 0;
    }

    /**
     * Gère la soumission du formulaire.
     * Déclenche la validation et bloque l'envoi si des erreurs sont présentes.
     * À lier via `x-on:submit="handleSubmit"` sur l'élément `<form>`.
     * @param {Event} event
     * @returns {void}
     */
    handleSubmit(event) {
        this.submitted = true;

        if (!this.accessKey) {
            event.preventDefault();
            return;
        }

        if (!this.validate(event.target)) {
            event.preventDefault();
        }
    }
}






