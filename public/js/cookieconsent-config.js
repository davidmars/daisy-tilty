import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom right",
            equalWeightButtons: false,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: false,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        analytics: {}
    },
    language: {
        default: "en",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "Cookie management",
                    description: "This site uses cookies to ensure proper functionality and improve your experience. Some cookies are essential, while others help measure usage and enhance features. You can accept all cookies, reject optional ones, or customize your preferences.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject optional cookies",
                    showPreferencesBtn: "Customize",
                    footer: ""
                },
                preferencesModal: {
                    title: "Cookie preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject optional cookies",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Cookie usage",
                            description: "Cookies are small files stored on your device when using the site. They help ensure proper functionality, secure access, and—if you allow it—measure usage and improve features."
                        },
                        {
                            title: "Strictly necessary cookies <span class=\"pm__badge\">Always enabled</span>",
                            description: "These cookies are essential for the site to function properly and cannot be disabled.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Analytics cookies",
                            description: "These cookies help measure how the site is used in order to improve performance and features.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "More information",
                            description: "For any questions regarding cookies or your choices, you can contact us."
                        }
                    ]
                }
            },

            fr: {
                consentModal: {
                    title: "Gestion des cookies",
                    description: "Ce site utilise des cookies afin d’assurer son bon fonctionnement et d’améliorer votre expérience. Certains cookies sont nécessaires, tandis que d’autres permettent de mesurer l’utilisation et d’améliorer les fonctionnalités.",
                    acceptAllBtn: "Accepter tous les cookies",
                    acceptNecessaryBtn: "Refuser les cookies optionnels",
                    showPreferencesBtn: "Personnaliser",
                    footer: ""
                },
                preferencesModal: {
                    title: "Préférences de cookies",
                    acceptAllBtn: "Accepter tous les cookies",
                    acceptNecessaryBtn: "Refuser les cookies optionnels",
                    savePreferencesBtn: "Enregistrer mes choix",
                    closeIconLabel: "Fermer",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Utilisation des cookies",
                            description: "Les cookies sont de petits fichiers stockés sur votre appareil lors de l’utilisation du site."
                        },
                        {
                            title: "Cookies strictement nécessaires <span class=\"pm__badge\">Toujours activés</span>",
                            description: "Ces cookies sont indispensables au fonctionnement du site.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Cookies analytiques",
                            description: "Ces cookies permettent de mesurer l’utilisation du site afin d’en améliorer les performances.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Plus d’informations",
                            description: "Pour toute question concernant les cookies, vous pouvez nous contacter."
                        }
                    ]
                }
            },

            es: {
                consentModal: {
                    title: "Gestión de cookies",
                    description: "Este sitio utiliza cookies para garantizar su correcto funcionamiento y mejorar su experiencia.",
                    acceptAllBtn: "Aceptar todas",
                    acceptNecessaryBtn: "Rechazar cookies opcionales",
                    showPreferencesBtn: "Personalizar",
                    footer: ""
                },
                preferencesModal: {
                    title: "Preferencias de cookies",
                    acceptAllBtn: "Aceptar todas",
                    acceptNecessaryBtn: "Rechazar cookies opcionales",
                    savePreferencesBtn: "Guardar preferencias",
                    closeIconLabel: "Cerrar",
                    serviceCounterLabel: "Servicio|Servicios",
                    sections: [
                        { title: "Uso de cookies", description: "Las cookies se almacenan en su dispositivo para el funcionamiento del sitio." },
                        { title: "Cookies necesarias <span class=\"pm__badge\">Siempre activas</span>", description: "Son esenciales para el funcionamiento.", linkedCategory: "necessary" },
                        { title: "Cookies analíticas", description: "Permiten analizar el uso del sitio.", linkedCategory: "analytics" },
                        { title: "Más información", description: "Puede contactarnos para más información." }
                    ]
                }
            },

            it: {
                consentModal: {
                    title: "Gestione dei cookie",
                    description: "Questo sito utilizza cookie per garantire il corretto funzionamento e migliorare l’esperienza.",
                    acceptAllBtn: "Accetta tutto",
                    acceptNecessaryBtn: "Rifiuta cookie opzionali",
                    showPreferencesBtn: "Personalizza",
                    footer: ""
                },
                preferencesModal: {
                    title: "Preferenze cookie",
                    acceptAllBtn: "Accetta tutto",
                    acceptNecessaryBtn: "Rifiuta cookie opzionali",
                    savePreferencesBtn: "Salva preferenze",
                    closeIconLabel: "Chiudi",
                    serviceCounterLabel: "Servizio|Servizi",
                    sections: [
                        { title: "Uso dei cookie", description: "I cookie vengono salvati sul dispositivo durante l’uso del sito." },
                        { title: "Cookie necessari <span class=\"pm__badge\">Sempre attivi</span>", description: "Necessari al funzionamento.", linkedCategory: "necessary" },
                        { title: "Cookie analitici", description: "Permettono di analizzare l’uso.", linkedCategory: "analytics" },
                        { title: "Maggiori informazioni", description: "Contattaci per ulteriori informazioni." }
                    ]
                }
            },

            de: {
                consentModal: {
                    title: "Cookie-Verwaltung",
                    description: "Diese Website verwendet Cookies, um die Funktion zu gewährleisten und die Nutzung zu verbessern.",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Optionale Cookies ablehnen",
                    showPreferencesBtn: "Anpassen",
                    footer: ""
                },
                preferencesModal: {
                    title: "Cookie-Einstellungen",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Optionale Cookies ablehnen",
                    savePreferencesBtn: "Speichern",
                    closeIconLabel: "Schließen",
                    serviceCounterLabel: "Dienst|Dienste",
                    sections: [
                        { title: "Verwendung von Cookies", description: "Cookies werden auf Ihrem Gerät gespeichert." },
                        { title: "Notwendige Cookies <span class=\"pm__badge\">Immer aktiv</span>", description: "Erforderlich für die Funktion.", linkedCategory: "necessary" },
                        { title: "Analyse-Cookies", description: "Zur Analyse der Nutzung.", linkedCategory: "analytics" },
                        { title: "Weitere Informationen", description: "Kontaktieren Sie uns für weitere Informationen." }
                    ]
                }
            },

            pt: {
                consentModal: {
                    title: "Gestão de cookies",
                    description: "Este site utiliza cookies para garantir o funcionamento e melhorar a experiência.",
                    acceptAllBtn: "Aceitar tudo",
                    acceptNecessaryBtn: "Rejeitar cookies opcionais",
                    showPreferencesBtn: "Personalizar",
                    footer: ""
                },
                preferencesModal: {
                    title: "Preferências de cookies",
                    acceptAllBtn: "Aceitar tudo",
                    acceptNecessaryBtn: "Rejeitar cookies opcionais",
                    savePreferencesBtn: "Guardar preferências",
                    closeIconLabel: "Fechar",
                    serviceCounterLabel: "Serviço|Serviços",
                    sections: [
                        { title: "Uso de cookies", description: "Cookies são armazenados no seu dispositivo." },
                        { title: "Cookies necessários <span class=\"pm__badge\">Sempre ativos</span>", description: "Essenciais para o funcionamento.", linkedCategory: "necessary" },
                        { title: "Cookies analíticos", description: "Permitem analisar o uso.", linkedCategory: "analytics" },
                        { title: "Mais informações", description: "Contacte-nos para mais informações." }
                    ]
                }
            }
        }
    },
    disablePageInteraction: true
});