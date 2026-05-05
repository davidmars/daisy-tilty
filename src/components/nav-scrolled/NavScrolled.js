/**
 * Gère l'état de la navbar transparente au scroll.
 * Gère également l'ouverture/fermeture du drawer mobile de navigation.
 */
export class NavScrolled {
    constructor() {
        /** @type {boolean} */
        this.scrolled = false;

        /** @type {boolean} */
        this.isHidden = false;

        /** @type {number} */
        this.lastScroll = 0;

        /**
         * État du drawer mobile.
         * `null` = jamais ouvert (évite l'animation CSS au chargement),
         * `true` = ouvert, `false` = fermé.
         * @type {boolean|null}
         */
        this.drawerOpen = null;

        /** @type {function|null} */
        this._onScroll = null;
    }

    /**
     * Initialise le listener de scroll (appelé automatiquement par Alpine.js).
     * @returns {void}
     */
    init() {
        this._onScroll = () => {
            if (this.drawerOpen) return; // ne pas masquer la nav si le drawer est ouvert
            const currentScroll = window.scrollY;
            this.scrolled = currentScroll > 20;

            if (currentScroll > this.lastScroll && currentScroll > 80) {
                this.isHidden = true;
            } else {
                this.isHidden = false;
            }
            this.lastScroll = currentScroll;
        };
        window.addEventListener('scroll', this._onScroll, { passive: true });
        this._onScroll();
    }

    /**
     * Bascule l'ouverture du drawer mobile.
     * La synchronisation avec la checkbox DaisyUI est assurée par `x-effect` dans le HTML.
     * @returns {void}
     */
    toggleDrawer() {
        this.drawerOpen = this.drawerOpen === null ? true : !this.drawerOpen;
        if (this.drawerOpen) this.isHidden = false;
    }

    /**
     * Nettoie le listener de scroll à la destruction du composant.
     * @returns {void}
     */
    destroy() {
        if (this._onScroll) {
            window.removeEventListener('scroll', this._onScroll);
        }
    }
}
