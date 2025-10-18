// --- Load translations from JSON file ---
async function getTranslations() {
    try {
        const res = await fetch("./src/scripts/data.json");
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error loading translations:", error);
        return {}; // return empty object if loading fails
    }
}

let translations = {};
const supportedLangs = ["fr", "en", "ar", "es", "de"];
const flags = { fr: "🇫🇷", en: "🇬🇧", ar: "🇸🇦", es: "🇪🇸", de: "🇩🇪" };

// --- Main initialization ---
document.addEventListener("DOMContentLoaded", async () => {
    translations = await getTranslations();

    // Detect language (priority: saved > browser > default)
    const browserLang = (navigator.language || navigator.userLanguage || "en").slice(0, 2);
    const savedLang = localStorage.getItem("language");
    const lang = supportedLangs.includes(savedLang)
        ? savedLang
        : supportedLangs.includes(browserLang)
            ? browserLang
            : "en";

    // Apply language
    applyLanguage(lang);

    // Add click listeners to language buttons
    document.querySelectorAll(".lang-btn").forEach(btn =>
        btn.addEventListener("click", () => applyLanguage(btn.dataset.lang))
    );
});

// --- Apply selected language ---
function applyLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language "${lang}" not found in data.json`);
        return;
    }

    // Save chosen language
    localStorage.setItem("language", lang);

    // Update all translatable elements
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    // Set document direction (RTL for Arabic)
    const isArabic = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    // Update active state of language buttons
    document.querySelectorAll(".lang-btn").forEach(btn =>
        btn.classList.toggle("active", btn.dataset.lang === lang)
    );

    // Update flag and language code display
    const currentFlag = document.getElementById("current-lang-flag");
    const currentCode = document.getElementById("current-lang-code");
    if (currentFlag && currentCode) {
        currentFlag.textContent = flags[lang] || "🏳️";
        currentCode.textContent = lang.toUpperCase();
    }
}
