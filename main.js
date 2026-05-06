import Alpine from "alpinejs";
import {LightBox} from "@comp/light-box/LightBox.js";
import {Web3Form} from "@comp/web3-form/Web3Form.js";
import {Share} from "@comp/share/Share.js";
import {SwiperCarousel} from "@comp/swiper/SwiperCarousel.js";
import {SwiperVideoCarousel} from "@comp/swiper/SwiperVideoCarousel.js";
import {NavScrolled} from "@comp/nav-scrolled/NavScrolled.js";
import {ScrollManager} from "@comp/scroll/ScrollManager.js";
import {ParallaxManager} from "@comp/scroll/ParallaxManager.js";
import {RevealManager} from "@comp/scroll/RevealManager.js";
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

    // Composant Swiper avec vidéos HTML5 embarquées
    Alpine.data('swiperVideo', (args) => new SwiperVideoCarousel(args));

    // Navbar transparente au scroll
    Alpine.data('navScrolled', () => new NavScrolled());

    // Scroll fluide (Lenis) — actif si VITE_SMOOTH_SCROLL=true
    if (import.meta.env.VITE_SMOOTH_SCROLL === 'true') {
        const scrollManager = new ScrollManager();
        scrollManager.init();
        Alpine.store('scroll', scrollManager);
    }
});

// ─── Alpine.js ────────────────────────────────────────────────────────────────

globalThis.Alpine = Alpine;
window.Alpine = Alpine;
Alpine.start();

// ─── Animations au scroll ─────────────────────────────────────────────────────
// Les scripts type="module" (Vite) s'exécutent après le parsing du DOM :
// DOMContentLoaded est déjà passé, on appelle directement.

if (import.meta.env.VITE_PARALLAX === 'true') {
    new ParallaxManager().init();
}

const aosEnabled = import.meta.env.VITE_AOS === 'true';
new RevealManager().init(aosEnabled);

