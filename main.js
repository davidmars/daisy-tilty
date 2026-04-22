import {Embla} from "@comp/embla.js";
import Alpine from "alpinejs";




document.addEventListener('alpine:init', () => {
    console.log("Alpine init")
    Alpine.data('embla', (args) => new Embla(args));
});

// ─── Alpine.js ────────────────────────────────────────────────────────────────

globalThis.Alpine = Alpine;
window.Alpine = Alpine;
Alpine.start();
