import Lenis from 'lenis';

/**
 * Gère le scroll fluide via Lenis.
 * Initialisé une seule fois dans main.js et exposé via Alpine.store('scroll').
 * Actif uniquement si VITE_SMOOTH_SCROLL=true dans .env.local.
 */
export class ScrollManager {
    constructor() {
        /** @type {Lenis|null} */
        this.lenis = null;

        /** @type {number|null} */
        this._rafId = null;
    }

    /**
     * Initialise Lenis et démarre la boucle requestAnimationFrame.
     * @returns {void}
     */
    init() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const raf = (time) => {
            this.lenis.raf(time);
            this._rafId = requestAnimationFrame(raf);
        };
        this._rafId = requestAnimationFrame(raf);
    }

    /**
     * Fait défiler la page vers une cible.
     * Utilisable depuis le HTML via `$store.scroll.scrollTo('#ancre')`.
     * @param {string|HTMLElement|number} target — sélecteur CSS, élément ou position en px
     * @param {import('lenis').ScrollToOptions} [options]
     * @returns {void}
     */
    scrollTo(target, options = {}) {
        this.lenis?.scrollTo(target, options);
    }

    /**
     * Stoppe Lenis et annule la boucle RAF.
     * @returns {void}
     */
    destroy() {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        this.lenis?.destroy();
        this.lenis = null;
    }
}

