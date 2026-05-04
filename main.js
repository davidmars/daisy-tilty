import Alpine from "alpinejs";
import {LightBox} from "@comp/light-box/LightBox.js";
import {Web3Form} from "@comp/web3-form/Web3Form.js";
import {Share} from "@comp/share/Share.js";
import {SwiperCarousel} from "@comp/swiper/SwiperCarousel.js";
import $ from "cash-dom";

// On expose cash au besoin dans le window
window.$ = $;
window.cash = $;

document.addEventListener('alpine:init', () => {
    // light box global
    const globalLightbox = new LightBox('.lightbox, .glightbox');
    Alpine.store('lightbox', globalLightbox);

    // Formulaire Web3Forms
    Alpine.data('web3Forms', () => new Web3Form());

    // Partage natif (Web Share API)
    Alpine.data('share', () => new Share());

    // Composant Swiper
    Alpine.data('swiper', (args) => new SwiperCarousel(args));
});

// ─── Alpine.js ────────────────────────────────────────────────────────────────

globalThis.Alpine = Alpine;
window.Alpine = Alpine;
Alpine.start();
