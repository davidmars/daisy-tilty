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
    this.total=99;
    this.current=0;
    this.updatePending = false;
    this.autoScrollRaf = null;
    // Propriété réactive Alpine: peut être modifiée directement via x-on
    this.autoScrollSpeed = options?.autoScrollSpeed ?? 0.6;
    // Vitesse initiale pour restauration après drag mobile
    this.autoScrollInitialSpeed = this.autoScrollSpeed;
    // Vitesse courante lerpée (interne, non réactive)
    this._autoScrollCurrentSpeed = this.autoScrollSpeed;
  }



  /** @this {Embla & { $el: HTMLElement }} */
  init() {
      const wrapperNode = this.$el;
      const viewportNode = wrapperNode.querySelector('.embla__viewport');

      for (const element of [wrapperNode, viewportNode]) {
        if (!element) {
          console.warn('EmblaCarousel: missing element', element);
          return;
        }
      }
      this.emblaApi=EmblaCarousel(
          viewportNode, {
          loop: this.options.loop ?? false,
          dragFree: this.options.dragFree ?? false,
      }, [Autoplay()])

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

      if (this.options.autoScroll) {
          this.setupAutoScroll();
      }

      u();

      if(this.options.autoplay){
          this.emblaApi.plugins().autoplay.play()
      }else{
          this.emblaApi.plugins().autoplay.stop()
      }
  }

  update() {
      const newCurrent = this.emblaApi.selectedScrollSnap();
      const newTotal = this.emblaApi.slideNodes().length;

      // Optimisation: ne mettre à jour que si les valeurs changent vraiment
      // Évite de déclencher la réactivité Alpine inutilement
      if (this.current !== newCurrent || this.total !== newTotal) {
          this.current = newCurrent;
          this.total = newTotal;
      }
  }

  setupAutoScroll() {
      const lerpFactor = this.options.autoScrollLerp ?? 0.06;

      const tick = () => {
          if (!this.emblaApi) return;

          // Lerp vers la vitesse cible
          this._autoScrollCurrentSpeed += (this.autoScrollSpeed - this._autoScrollCurrentSpeed) * lerpFactor;

          if (Math.abs(this._autoScrollCurrentSpeed) > 0.001) {
              const engine = this.emblaApi.internalEngine();
              if (!engine.dragHandler.pointerDown()) {
                  engine.scrollBody.useFriction(0.35).useDuration(0.7);
                  engine.target.add(this._autoScrollCurrentSpeed);
                  engine.animation.start();
              }
          }

          this.autoScrollRaf = requestAnimationFrame(tick);
      };

      this.autoScrollRaf = requestAnimationFrame(tick);
  }
}

