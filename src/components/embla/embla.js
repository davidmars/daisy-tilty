import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

export class Embla {
    /**
     *
     * @param {EmblaOptions} options
     */
  constructor(options) {
    console.log("Embla constructor", options);
    this.options = options || {};
    this.total=99;
    this.current=0;
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
          loop: this.options.loop
      }, [Autoplay()])
      let u = () => {
          this.update();
      };
      this.emblaApi.on('select', u).on('reInit', u)
      u();

      if(this.options.autoplay){
          this.emblaApi.plugins().autoplay.play()
      }else{
          this.emblaApi.plugins().autoplay.stop()
      }

  }

  update() {
      this.current = this.emblaApi.selectedScrollSnap();
      this.total = this.emblaApi.slideNodes().length;
  }
}

