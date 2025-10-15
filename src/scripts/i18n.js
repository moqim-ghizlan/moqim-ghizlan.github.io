async function getJson() {
    const response = await fetch("./src/scripts/data.json");
    const json = await response.json();
    return json;
}

let translations = {}; // variable globale

async function initTranslations() {
    translations = await getJson();

    // Détecter la langue du navigateur
    const userLang = navigator.language || navigator.userLanguage; // ex: "fr-FR", "ar-SA"
    let lang = userLang.slice(0, 2); // garder juste les 2 premières lettres

    // Liste des langues supportées
    const supportedLangs = ["fr", "en", "ar", "es"];
    if (!supportedLangs.includes(lang)) lang = "fr"; // par défaut si non supportée

    // Vérifier si l’utilisateur a déjà choisi une langue
    const savedLang = localStorage.getItem('language');
    if (savedLang && supportedLangs.includes(savedLang)) {
        lang = savedLang;
    }

    // Appliquer la langue
    changeLanguage(lang);

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

    // Mettre à jour le sélecteur de langue si tu as des flags
    const flags = { fr: "🇫🇷", en: "🇬🇧", ar: "🇸🇦", es: "🇪🇸" };
    const currentFlag = document.getElementById("current-lang-flag");
    const currentCode = document.getElementById("current-lang-code");
    if (currentFlag && currentCode) {
        currentFlag.textContent = flags[lang];
        currentCode.textContent = lang.toUpperCase();
    }
}

// Initialisation une fois le DOM chargé
document.addEventListener('DOMContentLoaded', initTranslations);
