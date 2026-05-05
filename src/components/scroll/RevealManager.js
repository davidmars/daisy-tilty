import { inView, animate, stagger } from 'motion';
import $ from 'cash-dom';

/**
 * Presets d'animation disponibles pour `data-reveal`.
 * Chaque preset définit les keyframes Motion et l'état de reset (sortie du viewport).
 * `mask: true` indique que l'opacité initiale est 1 (le masquage est fait via clipPath).
 *
 * @type {Record<string, { keyframes: object, reset: object, mask?: boolean }>}
 */
const PRESETS = {
    fade:      { keyframes: { opacity: [0, 1] },                                                                          reset: { opacity: 0 } },
    fadeBlur:  { keyframes: { opacity: [0, 1], filter: ['blur(12px)', 'blur(0px)'] },                                     reset: { opacity: 0, filter: 'blur(12px)' } },
    fadeUp:    { keyframes: { opacity: [0, 1], y: [40, 0] },                                                              reset: { opacity: 0, y: 40 } },
    fadeDown:  { keyframes: { opacity: [0, 1], y: [-40, 0] },                                                             reset: { opacity: 0, y: -40 } },
    fadeLeft:  { keyframes: { opacity: [0, 1], x: [40, 0] },                                                              reset: { opacity: 0, x: 40 } },
    fadeRight: { keyframes: { opacity: [0, 1], x: [-40, 0] },                                                             reset: { opacity: 0, x: -40 } },
    maskUp:    { keyframes: { clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'], y: [0, 0] },                     reset: { clipPath: 'inset(100% 0% 0% 0%)', y: 20 },  mask: true },
    maskDown:  { keyframes: { clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'], y: [0, 0] },                    reset: { clipPath: 'inset(0% 0% 100% 0%)', y: -20 }, mask: true },
    maskLeft:  { keyframes: { clipPath: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'], x: [0, 0] },                     reset: { clipPath: 'inset(0% 0% 0% 100%)', x: 20 },  mask: true },
    maskRight: { keyframes: { clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'], x: [0, 0] },                    reset: { clipPath: 'inset(0% 100% 0% 0%)', x: -20 }, mask: true },
    zoomIn:    { keyframes: { opacity: [0, 1], scale: [0.85, 1] },                                                        reset: { opacity: 0, scale: 0.85 } },
    zoomOut:   { keyframes: { opacity: [0, 1], scale: [1.15, 1] },                                                        reset: { opacity: 0, scale: 1.15 } },
};

/** Preset appliqué si `data-reveal` est présent mais vide ou non reconnu. */
const DEFAULT_PRESET = 'fadeUp';

/**
 * Gère les animations d'apparition au scroll sur les éléments `[data-reveal]`.
 * Utilise Motion `inView()` + `animate()` + `stagger()`.
 * Actif uniquement si VITE_AOS=true dans .env.local
 * et si l'utilisateur n'a pas activé `prefers-reduced-motion`.
 *
 * @example
 * <h2 data-reveal="fadeUp">Titre</h2>
 * <p data-reveal="fade">Paragraphe (opacité seule)</p>
 * <p data-reveal="maskLeft" data-reveal-delay="0.2">Paragraphe</p>
 *
 * <!-- Stagger : du premier au dernier (par défaut) -->
 * <ul data-reveal="stagger"     data-reveal-preset="fadeUp" data-reveal-stagger="0.05"> … </ul>
 * <ul data-reveal="stagger.asc" data-reveal-preset="fade"   data-reveal-stagger="0.07" data-reveal-delay="0.25"> … </ul>
 *
 * <!-- Stagger : du dernier au premier -->
 * <ul data-reveal="stagger.desc" data-reveal-preset="maskDown" data-reveal-stagger="0.05"> … </ul>
 *
 * <!-- Stagger : ordre aléatoire -->
 * <ul data-reveal="stagger.random" data-reveal-preset="zoomIn" data-reveal-stagger="0.06"> … </ul>
 *
 * <!-- Sélecteur profond -->
 * <div data-reveal="stagger" data-reveal-preset="fadeLeft" data-reveal-selector="li span"> … </div>
 */
export class RevealManager {
    /**
     * Initialise les animations sur tous les éléments `[data-reveal]` présents dans le DOM.
     * @param {boolean} isEnabled - Si false, affiche immédiatement tous les éléments sans animation.
     * @returns {void}
     */
    init(isEnabled = true) {
        const els = $('[data-reveal]');

        /**
         * Retourne la liste des cibles à animer pour un élément.
         * @param {HTMLElement} el
         * @returns {HTMLElement | HTMLElement[]}
         */
        const getTargets = (el) => {
            if (!el.dataset.reveal.startsWith('stagger')) return el;
            const sel = el.dataset.revealSelector;
            if (!sel) return $(el).children().get();
            const cleanSel = sel.trim();
            if (cleanSel.startsWith('>')) return $(el).children(cleanSel.substring(1).trim()).get();
            return $(el).find(cleanSel).get();
        };

        // AOS désactivé ou prefers-reduced-motion : tout visible immédiatement
        if (!isEnabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            els.each((i, el) => {
                animate(getTargets(el), { opacity: 1, clipPath: 'inset(0)', y: 0, x: 0, scale: 1 }, { duration: 0 });
            });
            return;
        }

        els.each((i, el) => {
            const revealValue = el.dataset.reveal;
            const isStagger   = revealValue.startsWith('stagger');
            /** @type {'asc'|'desc'|'random'} */
            const staggerMode = /** @type {any} */ (revealValue.split('.')[1] || 'asc');

            const presetName  = isStagger
                ? (el.dataset.revealPreset || DEFAULT_PRESET)
                : (revealValue || DEFAULT_PRESET);
            const preset      = PRESETS[presetName] ?? PRESETS[DEFAULT_PRESET];
            const delay       = Number(el.dataset.revealDelay) || 0;
            const staggerStep = Number(el.dataset.revealStagger) || 0.05;

            // Récupération des cibles de base (ordre du DOM, jamais modifié)
            const baseTargets = getTargets(el);

            // Pré-masquage JS : nécessaire pour les stagger (le CSS ne peut pas
            // accéder au preset du parent pour styler ses enfants)
            if (isStagger) {
                const resetProps = preset.mask
                    ? { ...preset.reset, opacity: 1 }  // masque clip-path, on garde opacity:1
                    : preset.reset;
                const targetsArray = Array.isArray(baseTargets) ? baseTargets : [baseTargets];
                targetsArray.forEach(t => animate(t, resetProps, { duration: 0 }));
            }

            inView(
                el,
                () => {
                    const duration    = Number(el.dataset.revealDuration) || 0.7;
                    const easing      = [0.17, 0.55, 0.55, 1];
                    const targetDelay = isStagger ? stagger(staggerStep, { startDelay: delay }) : delay;

                    // Réordonnancement recalculé à chaque déclenchement (indispensable pour random)
                    let targets = baseTargets;
                    if (isStagger && Array.isArray(baseTargets)) {
                        if (staggerMode === 'desc')   targets = [...baseTargets].reverse();
                        if (staggerMode === 'random') targets = [...baseTargets].sort(() => Math.random() - 0.5);
                    }

                    // Pour les presets mask, l'opacité est déjà à 1 (masquage via clipPath)
                    // → on force opacity:1 avant l'animation pour ne pas hériter du CSS initial
                    if (preset.mask) {
                        animate(targets, { opacity: 1 }, { duration: 0 });
                    }

                    const controls = animate(
                        targets,
                        preset.keyframes,
                        { duration, delay: targetDelay, easing }
                    );

                    // Fonction de leave : reset sur baseTargets (tous les éléments, peu importe l'ordre)
                    return () => {
                        controls.stop();
                        const resetProps = preset.mask
                            ? { ...preset.reset, opacity: 1 }
                            : preset.reset;
                        const targetsArray = Array.isArray(baseTargets) ? baseTargets : [baseTargets];
                        targetsArray.forEach(t => animate(t, resetProps, { duration: 0 }));
                    };
                },
                { amount: 'some', margin: '-50px' }
            );
        });
    }
}





