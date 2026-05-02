import EmblaCarousel from 'embla-carousel'

/**
 * @typedef {Object} EmblaOptions
 * @property {boolean} [loop=false]
 * @property {boolean} [dragFree=false]
 * @property {'trimSnaps'|'keepSnaps'|''} [containScroll='trimSnaps']
 * @property {'start'|'center'|'end'|((viewSize: number, snapSize: number, index: number) => number)} [align='center']
 * @property {number} [slidesToScroll=1]
 * @property {boolean} [autoFill=false] - (Locale) Duplique les slides pour remplir le viewport.
 */

/**
 * Composant Embla v9 Core.
 */
export class Embla {
    /**
     * @param {EmblaOptions} options
     */
    constructor(options = {}) {
        /** @type {EmblaOptions} */
        this.options = options;

        /** @type {number} */
        this.total = 0;
        /** @type {number} */
        this.current = 0;
        /** @type {import('embla-carousel').EmblaCarouselType | null} */
        this.emblaApi = null;

        /** @type {boolean} */
        this._isInitialized = false;
        /** @type {number} */
        this.originalSlidesCount = 0;
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

        this._handleAutoFill(containerNode);

        const { autoFill, ...emblaOptions } = this.options;

        this.emblaApi = EmblaCarousel(viewportNode, {
            loop: false,
            dragFree: false,
            containScroll: 'trimSnaps',
            align: 'center',
            slidesToScroll: 1,
            ...emblaOptions,
        });

        this.originalSlidesCount = containerNode.querySelectorAll(':scope > *:not([inert])').length;

        const onSelect = () => {
            this.current = this.emblaApi.selectedSnap();
            this.total = this.originalSlidesCount || this.emblaApi.snapList().length;
        };

        this.emblaApi.on('select', onSelect);
        this.emblaApi.on('reinit', onSelect);

        this._isInitialized = true;
        onSelect();
    }

    /**
     * Duplique les slides pour assurer un défilement infini visuellement plein.
     * @param {HTMLElement} container
     * @returns {void}
     */
    _handleAutoFill(container) {
        if (!this.options.autoFill) return;

        const slides = Array.from(container.children);
        if (slides.length === 0) return;

        const minItems = 20;
        if (slides.length < minItems) {
            const repeatCount = Math.ceil(minItems / slides.length) - 1;
            for (let i = 0; i < repeatCount; i++) {
                slides.forEach(slide => {
                    const clone = /** @type {HTMLElement} */ (slide.cloneNode(true));
                    clone.inert = true;
                    container.appendChild(clone);
                });
            }
        }
    }

    /**
     * Indique si le contenu des slides dépasse la largeur du viewport.
     * @returns {boolean}
     */
    get needsScroll() {
        if (!this.emblaApi) return false;
        if (this.options.loop) return true;
        return this.emblaApi.canGoToNext();
    }

    /** @returns {void} */
    scrollNext() { this.emblaApi?.goToNext(); }

    /** @returns {void} */
    scrollPrev() { this.emblaApi?.goToPrev(); }

    /**
     * @param {number} index
     * @returns {void}
     */
    scrollTo(index) { this.emblaApi?.goTo(index); }

    /** @returns {void} */
    destroy() {
        if (this.emblaApi) {
            this.emblaApi.destroy();
            this.emblaApi = null;
        }
        this._isInitialized = false;
    }
}
