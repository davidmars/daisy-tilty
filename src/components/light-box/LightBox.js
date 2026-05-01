import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import $ from 'cash-dom';

/**
 * Gère l'affichage des images et vidéos en plein écran.
 * Utilise la délégation d'événements via cash-dom pour supporter les éléments dynamiques.
 */
export class LightBox {
    /**
     * @param {string} selector - Le sélecteur CSS des éléments à inclure (ex: '.lightbox')
     */
    constructor(selector = '.lightbox') {
        this.selector = selector;
        /** @type {any} */
        this.instance = null;
        this.init();
    }

    /**
     * Initialise la délégation d'événements.
     * @returns {void}
     */
    init() {
        // On initialise GLightbox sans sélecteur automatique pour garder le contrôle
        this.instance = GLightbox({
            touchNavigation: true,
            loop: true,
        });

        // Délégation d'événement via cash-dom
        $(document).on('click', this.selector, (event) => {
            event.preventDefault();
            const element = event.currentTarget;
            
            // On ouvre manuellement l'élément cliqué
            this.instance.setElements([element]);
            this.instance.open();
            
            // Si l'élément appartient à une galerie, on recharge les éléments de cette galerie
            const galleryName = $(element).attr('data-gallery');
            if (galleryName) {
                const galleryElements = $(`${this.selector}[data-gallery="${galleryName}"]`).get();
                this.instance.setElements(galleryElements);
                const index = galleryElements.indexOf(element);
                this.instance.openAt(index);
            }
        });

        console.log(`LightBox prête (délégation sur : ${this.selector})`);
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