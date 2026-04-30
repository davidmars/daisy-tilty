import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { setupTweenParallax } from './EmblaCarouselTweenParallax.js'

export class Embla {
    /**
     *
     * @param {EmblaOptions} options
     */
  constructor(options) {
    this.options = options || {};
    this.total = 0;
    this.current = 0;
    this.updatePending = false;
    this.autoScrollRaf = null;
    this.emblaApi = null;
    this._isInitialized = false;
    // Propriété réactive Alpine: peut être modifiée directement via x-on
    this.autoScrollSpeed = options?.autoScrollSpeed ?? (options?.autoScroll ? 1 : 0.6);
    // Vitesse initiale pour restauration après drag mobile
    this.autoScrollInitialSpeed = this.autoScrollSpeed;
    // Vitesse courante lerpée (interne, non réactive)
    this._autoScrollCurrentSpeed = this.autoScrollSpeed;
  }



  /** @this {Embla & { $el: HTMLElement }} */
  init() {
      if (this._isInitialized) {
          return;
      }

      const wrapperNode = this.$el;
      const viewportNode = wrapperNode.querySelector('.embla__viewport');
      const containerNode = wrapperNode.querySelector('.embla__container');

      for (const element of [wrapperNode, viewportNode, containerNode]) {
        if (!element) {
          console.warn('EmblaCarousel: missing element', element);
          return;
        }
      }

      // Duplication automatique des slides pour assurer le remplissage (notamment pour AutoScroll)
      if (this.options.autoFill && (this.options.autoScroll || this.options.loop)) {
          const slides = Array.from(containerNode.children);
          if (slides.length > 0) {
              // Pour un effet infini propre, AutoScroll nécessite souvent que la largeur totale
              // dépasse largement celle du viewport (au moins 2x ou 3x).
              // On s'assure d'avoir au moins 30 items pour combler les grands écrans.
              const minItems = 30;
              if (slides.length < minItems) {
                  const repeatCount = Math.ceil(minItems / slides.length) - 1;
                  for (let i = 0; i < repeatCount; i++) {
                      slides.forEach(slide => {
                          const clone = slide.cloneNode(true);
                          clone.setAttribute('aria-hidden', 'true');
                          containerNode.appendChild(clone);
                      });
                  }
              }
          }
      }

      const plugins = [Autoplay({
          stopOnMouseEnter: true,
          stopOnInteraction: false
      })];

      this.emblaApi = EmblaCarousel(
          viewportNode, {
          loop: this.options.loop ?? false,
          dragFree: this.options.dragFree ?? false,
      }, plugins)

      // Conserver le nombre de slides originaux (avant duplication éventuelle via autoFill)
      this.originalSlidesCount = containerNode.querySelectorAll(':scope > *:not([aria-hidden="true"])').length;

      this._isInitialized = true;

      // Throttler les mises à jour Alpine avec rAF pour éviter les rendus excessifs
      const u = () => {
          if (this.updatePending) return;
          this.updatePending = true;
          requestAnimationFrame(() => {
              this.updatePending = false;
              this.update();
          });
      };

      this.emblaApi.on('select', u).on('reInit', u)

      if (this.options.parallax) {
          setupTweenParallax(this.emblaApi, this.options.parallaxFactor);
      }

      // On n'utilise plus le setupAutoScroll fait maison si le plugin officiel est présent
      // if (this.options.autoScroll) {
      //    this.setupAutoScroll();
      // }

      if (this.options.autoScroll) {
          this.setupAutoScroll();
      }

      u();

      if (this.options.autoplay) {
          this.emblaApi.plugins().autoplay.play()
      } else {
          this.emblaApi.plugins().autoplay.stop()
      }
  }

  update() {
      if (!this.emblaApi) {
          return;
      }

      const newCurrent = this.emblaApi.selectedScrollSnap();
      // Utiliser le nombre de slides originaux au lieu du nombre total (incluant les clones)
      const newTotal = this.originalSlidesCount || this.emblaApi.slideNodes().length;

      // Optimisation: ne mettre à jour que si les valeurs changent vraiment
      // Évite de déclencher la réactivité Alpine inutilement
      if (this.current !== newCurrent || this.total !== newTotal) {
          this.current = newCurrent;
          this.total = newTotal;
      }
  }

  setupAutoScroll() {
      if (this.autoScrollRaf) {
          cancelAnimationFrame(this.autoScrollRaf);
      }

      const lerpFactor = this.options.autoScrollLerp ?? 0.06;

      const tick = () => {
          if (!this.emblaApi) return;

          // Lerp vers la vitesse cible
          this._autoScrollCurrentSpeed += (this.autoScrollSpeed - this._autoScrollCurrentSpeed) * lerpFactor;

          if (Math.abs(this._autoScrollCurrentSpeed) > 0.001) {
              const engine = this.emblaApi.internalEngine();
              if (engine && !engine.dragHandler.pointerDown()) {
                  engine.scrollBody.useFriction(0.35).useDuration(0.7);
                  engine.target.add(this._autoScrollCurrentSpeed);
                  engine.animation.start();
              }
          }

          this.autoScrollRaf = requestAnimationFrame(tick);
      };

      this.autoScrollRaf = requestAnimationFrame(tick);
  }

  destroy() {
      if (this.autoScrollRaf) {
          cancelAnimationFrame(this.autoScrollRaf);
          this.autoScrollRaf = null;
      }

      if (this.emblaApi) {
          this.emblaApi.destroy();
          this.emblaApi = null;
      }

      this._isInitialized = false;
      this.updatePending = false;
  }
}
