import { scroll, animate } from 'motion';
import $ from 'cash-dom';

/**
 * Gère l'effet parallaxe sur les éléments portant l'attribut `data-speed`.
 * Utilise Motion `scroll(animate(...))` — la progression du scroll est directement
 * liée à l'animation Motion, sans callback ni manipulation DOM manuelle.
 * Actif uniquement si VITE_PARALLAX=true dans .env.local
 * et si l'utilisateur n'a pas activé `prefers-reduced-motion`.
 *
 * @example
 * <img data-speed="0.3" class="absolute inset-0 w-full h-[150%] object-cover" />
 */
export class ParallaxManager {
    constructor() {
        /**
         * Fonctions de nettoyage retournées par Motion scroll().
         * @type {Array<function>}
         */
        this._cleanups = [];
    }

    /**
     * Initialise le parallaxe sur tous les éléments `[data-speed]` présents dans le DOM.
     * @returns {void}
     */
    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        $('[data-speed]').each((i, el) => {
            const raw = Number(el.dataset.speed);
            const speed = isNaN(raw) ? 0.3 : raw;
            if (speed === 0) return;

            const distance = speed * 150;

            // Garantit que le conteneur est non-statique pour Motion
            const container = el.parentElement || el;
            if (getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }

            // Motion drive directement l'animation y via la progression du scroll
            const cleanup = scroll(
                animate(el, { y: [-distance, distance] }),
                { target: container, offset: ['start end', 'end start'] }
            );

            this._cleanups.push(cleanup);
        });
    }

    /**
     * Supprime tous les listeners Motion.
     * @returns {void}
     */
    destroy() {
        this._cleanups.forEach(cleanup => cleanup());
        this._cleanups = [];
    }
}

