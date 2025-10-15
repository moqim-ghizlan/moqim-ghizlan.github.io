
async function getJson() {
    const response = await fetch("./src/scripts/data.json");
    const json = await response.json();
    return json;
}

let translations = {}; // variable globale

async function initTranslations() {
    translations = await getJson();

    // Récupérer la langue sauvegardée ou par défaut "fr"
    const savedLang = localStorage.getItem('language') || 'fr';
    changeLanguage(savedLang);

    // Ajouter les écouteurs d'événements aux boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

// Fonction pour changer la langue
function changeLanguage(lang) {
    if (!translations[lang]) return; // sécurité si la langue n’existe pas

    // Sauvegarder la langue choisie
    localStorage.setItem('language', lang);

    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Gérer la direction du texte
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }

    // Mettre à jour les boutons de langue actifs
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Initialisation une fois le DOM chargé
document.addEventListener('DOMContentLoaded', initTranslations);
