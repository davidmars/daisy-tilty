import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

export class LightBox {
    /**
     * @param {string} selector - Le sélecteur CSS des éléments à inclure (ex: '.glightbox')
     */
    constructor(selector = '.lightbox') {
        console.log("LightBox", selector);
        this.selector = selector;
        this.instance = null;
        this.init();
    }

    /**
     * Initialisé automatiquement par Alpine
     */
    init() {
        console.log("Initialisation de LightBox pour le sélecteur :", this.selector);
        this.instance = GLightbox({
            selector: this.selector,
            touchNavigation: true,
            loop: true,
            //autoplayVideos: true,
        });

        console.log(`LightBox prête pour le sélecteur : ${this.selector}`);
    }

    /**
     * Nettoyage si le composant est retiré (utile pour les Single Page Apps)
     */
    destroy() {
        if (this.instance) {
            this.instance.destroy();
        }
    }
}