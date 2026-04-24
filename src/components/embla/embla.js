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
}

