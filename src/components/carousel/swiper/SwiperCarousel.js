import Swiper from 'swiper'
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

/**
 * Composant Alpine.js pour Swiper.
 * Accepte toutes les options natives Swiper.
 * La navigation et la pagination sont gérées nativement par Swiper
 * via les éléments `.swiper-button-prev`, `.swiper-button-next`, `.swiper-pagination`.
 */
export class SwiperCarousel {
    /** @param {import('swiper/types').SwiperOptions} options */
    constructor(options = {}) {
        this.options = options;
    }

    /** @this {SwiperCarousel & { $el: HTMLElement }} */
    init() {
        new Swiper(this.$el, {
            modules: [FreeMode, Autoplay, Navigation, Pagination],
            grabCursor: true,
            ...this.options,
        });
    }
}

