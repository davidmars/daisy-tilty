import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/**
 * Composant Alpine.js pour un carrousel Swiper avec slides vidéo HTML5 embarquées.
 * Gère automatiquement la lecture et la pause des éléments <video>
 * au changement de slide. Si la slide active contient une vidéo,
 * l'autoplay Swiper est suspendu jusqu'à la fin de la lecture.
 */
export class SwiperVideoCarousel {
    /** @param {import('swiper/types').SwiperOptions} options */
    constructor(options = {}) {
        this.options = options;
        /** @type {import('swiper/types').Swiper|null} */
        this.swiper = null;
    }

    /** @this {SwiperVideoCarousel & { $el: HTMLElement }} */
    init() {
        this.swiper = new Swiper(this.$el, {
            modules: [Autoplay, Navigation, Pagination],
            grabCursor: true,
            ...this.options,
            on: {
                ...(this.options.on ?? {}),
                slideChange: (swiper) => this._handleSlideChange(swiper),
            },
        });
    }

    /**
     * Met en pause et remet à zéro les vidéos des slides inactives.
     * Lance la lecture de la vidéo de la slide active si elle en contient une,
     * et suspend l'autoplay Swiper le temps de la lecture.
     * @param {import('swiper/types').Swiper} swiper
     * @returns {void}
     */
    _handleSlideChange(swiper) {
        swiper.slides.forEach((slide, index) => {
            /** @type {HTMLVideoElement|null} */
            const video = slide.querySelector('video');
            if (!video) return;

            if (index === swiper.activeIndex) {
                video.play().then(() => {
                    if (swiper.autoplay?.running) {
                        swiper.autoplay.stop();
                    }
                }).catch(() => {
                    // Lecture bloquée par la politique autoplay du navigateur
                });

                video.addEventListener('ended', () => {
                    if (swiper.autoplay && this.options.autoplay) {
                        swiper.autoplay.start();
                    }
                }, { once: true });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }
}

