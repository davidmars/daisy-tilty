import {Embla} from "@comp/embla/embla.js";
import Alpine from "alpinejs";
import {LightBox} from "@comp/light-box/LightBox.js";
import {Web3Form} from "@comp/web3-form/Web3Form.js";







document.addEventListener('alpine:init', () => {
    console.log("Alpine init")
    // slide show
    Alpine.data('embla', (args) => new Embla(args));

    // light box global
    const globalLightbox = new LightBox('.lightbox, .glightbox');
    // On l'enregistre dans le store
    Alpine.store('lightbox', globalLightbox);

    // Formulaire Web3Forms
    Alpine.data('web3Forms', () => new Web3Form());
});

// ─── Alpine.js ────────────────────────────────────────────────────────────────

globalThis.Alpine = Alpine;
window.Alpine = Alpine;
Alpine.start();
