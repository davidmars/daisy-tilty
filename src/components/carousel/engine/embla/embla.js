import EmblaCarousel from 'embla-carousel'
import { setupTweenParallax } from './EmblaCarouselTweenParallax.js'

/**
 * @typedef {Object} EmblaOptions
 * @property {boolean} [loop=false] - Active le défilement infini.
 * @property {boolean} [dragFree=false] - Permet de lancer le carrousel librement sans s'arrêter sur des snaps.
 * @property {string} [containScroll='trimSnaps'] - Politique de confinement du défilement ('trimSnaps', 'keepSnaps', '').
 * @property {string} [align='center'] - Alignement des slides dans le viewport ('start', 'center', 'end').
 * @property {number} [slidesToScroll=1] - Nombre de slides à faire défiler par action.
 * @property {boolean} [autoFill=false] - Duplique automatiquement les slides pour remplir le viewport (utile pour AutoScroll/Loop).
 * @property {boolean} [autoScroll=false] - Active le défilement continu personnalisé (notre moteur interne).
 * @property {number} [autoScrollSpeed=1] - Vitesse du défilement continu. Une valeur négative inverse le sens.
 * @property {number} [autoScrollLerp=0.05] - Facteur d'interpolation (0 à 1) pour la fluidité du freinage/accélération. 0.05 par défaut.
 * @property {boolean} [autoplay=false] - Active le défilement automatique par étape.
 * @property {number} [autoplayDelay=4000] - Délai entre deux étapes d'autoplay (en ms).
 * @property {boolean} [parallax=false] - Active l'effet de parallaxe sur les slides.
 * @property {number} [parallaxFactor] - Intensité de l'effet parallaxe.
 */

/**
 * Composant Embla v9 Core - Sans plugins externes.
 * Gère le défilement continu (AutoScroll) et par étape (Autoplay) via une logique personnalisée.
 */
export class Embla {
    /**
     * @param {EmblaOptions} options - Options de configuration Embla et personnalisées
     */
    constructor(options = {}) {
        this.options = options;
        
        // États réactifs Alpine
        this.total = 0;
        this.current = 0;
        this.originalSlidesCount = 0;
        
        // Variables internes
        this.emblaApi = null;
        this._isInitialized = false;
        this._autoScrollRaf = null;
        this._autoplayTimer = null;

        // Configuration du défilement continu (Lerp)
        this.autoScrollSpeed = options.autoScrollSpeed ?? (options.autoScroll ? 1 : 0);
        this.autoScrollInitialSpeed = this.autoScrollSpeed;
        this._autoScrollCurrentSpeed = this.autoScrollSpeed;
        this.autoScrollLerp = options.autoScrollLerp ?? 0.05;

        // Configuration de l'Autoplay (étape par étape)
        this.autoplayDelay = options.autoplayDelay ?? 4000;
        this.autoplayEnabled = options.autoplay ?? false;
    }

    /** @this {Embla & { $el: HTMLElement }} */
    init() {
        if (this._isInitialized) return;

        const viewportNode = this.$el.querySelector('.embla__viewport');
        const containerNode = this.$el.querySelector('.embla__container');

        if (!viewportNode || !containerNode) {
            console.error('Embla: Nœuds DOM manquants (.embla__viewport ou .embla__container)');
            return;
        }

        // 1. Gestion du remplissage automatique (autoFill) avant init Embla
        this._handleAutoFill(containerNode);

        // 2. Initialisation d'Embla v9 Core
        this.emblaApi = EmblaCarousel(viewportNode, {
            loop: this.options.loop ?? false,
            dragFree: this.options.dragFree ?? false,
            containScroll: this.options.containScroll ?? 'trimSnaps',
            align: this.options.align ?? 'center',
            slidesToScroll: this.options.slidesToScroll ?? 1,
            ...this.options
        });

        // 3. Calcul du nombre de slides originaux
        this.originalSlidesCount = containerNode.querySelectorAll(':scope > *:not([aria-hidden="true"])').length;

        // 4. Événements
        const onSelect = () => {
            this.current = this.emblaApi.selectedScrollSnap();
            // Utilise originalSlidesCount si autoFill est actif, sinon le nombre de snaps
            this.total = this.originalSlidesCount || this.emblaApi.scrollSnapList().length;
        };

        this.emblaApi.on('select', onSelect);
        this.emblaApi.on('reInit', onSelect);

        // 5. Extensions personnalisées
        if (this.options.parallax) {
            setupTweenParallax(this.emblaApi, this.options.parallaxFactor);
        }

        if (this.options.autoScroll) {
            this.startAutoScroll();
        }

        if (this.autoplayEnabled) {
            this.startAutoplay();
        }

        this._isInitialized = true;
        onSelect(); // Synchronisation initiale
    }

    /**
     * Duplique les slides pour assurer un défilement infini visuellement plein.
     * @param {HTMLElement} container 
     */
    _handleAutoFill(container) {
        if (!this.options.autoFill) return;

        const slides = Array.from(container.children);
        if (slides.length === 0) return;

        // On s'assure d'avoir assez de slides pour combler les grands viewports
        const minItems = 20; 
        if (slides.length < minItems) {
            const repeatCount = Math.ceil(minItems / slides.length) - 1;
            for (let i = 0; i < repeatCount; i++) {
                slides.forEach(slide => {
                    const clone = slide.cloneNode(true);
                    clone.setAttribute('aria-hidden', 'true');
                    container.appendChild(clone);
                });
            }
        }
    }

    /**
     * Démarre la boucle de défilement continu avec interpolation (Lerp).
     */
    startAutoScroll() {
        this.stopAutoScroll();

        const tick = () => {
            if (!this.emblaApi) return;

            // Interpolation vers la vitesse cible
            this._autoScrollCurrentSpeed += (this.autoScrollSpeed - this._autoScrollCurrentSpeed) * this.autoScrollLerp;

            if (Math.abs(this._autoScrollCurrentSpeed) > 0.001) {
                const engine = this.emblaApi.internalEngine();
                // On n'applique le mouvement que si l'utilisateur ne drag pas
                if (engine && !engine.dragHandler.pointerDown()) {
                    engine.location.add(this._autoScrollCurrentSpeed);
                    engine.target.set(engine.location);
                    engine.scrollBody.useDefaultFriction();
                    engine.animation.start();
                }
            }

            this._autoScrollRaf = requestAnimationFrame(tick);
        };

        this._autoScrollRaf = requestAnimationFrame(tick);
    }

    stopAutoScroll() {
        if (this._autoScrollRaf) {
            cancelAnimationFrame(this._autoScrollRaf);
            this._autoScrollRaf = null;
        }
    }

    /**
     * Démarre l'autoplay (défilement par étape).
     */
    startAutoplay() {
        this.stopAutoplay();
        this._autoplayTimer = setInterval(() => {
            if (this.emblaApi && !this.emblaApi.internalEngine().dragHandler.pointerDown()) {
                if (this.emblaApi.canScrollNext()) {
                    this.emblaApi.scrollNext();
                } else {
                    this.emblaApi.scrollTo(0);
                }
            }
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this._autoplayTimer) {
            clearInterval(this._autoplayTimer);
            this._autoplayTimer = null;
        }
    }

    destroy() {
        this.stopAutoScroll();
        this.stopAutoplay();
        if (this.emblaApi) {
            this.emblaApi.destroy();
        }
        this._isInitialized = false;
    }
}
