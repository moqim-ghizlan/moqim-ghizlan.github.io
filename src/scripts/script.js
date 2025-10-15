const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', function () {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                document.getElementById('navbar-menu').classList.remove('active');
                document.getElementById('navbar-toggle').classList.remove('active');
            }
        }
    });
});


// Toggle du menu déroulant de langue
const langSelector = document.getElementById('lang-selector');
const langDropdown = document.querySelector('.language-dropdown');
const langMenu = document.getElementById('lang-menu');
const langOptions = document.querySelectorAll('.lang-option');
const currentLangFlag = document.getElementById('current-lang-flag');
const currentLangCode = document.getElementById('current-lang-code');

langSelector.addEventListener('click', function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});

// Fermer le menu si on clique ailleurs
document.addEventListener('click', function (e) {
    if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
    }
});

// Changer la langue
langOptions.forEach(option => {
    option.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        const flag = this.getAttribute('data-flag');
        const langCode = lang.toUpperCase();

        // Mettre à jour l'affichage
        currentLangFlag.textContent = flag;
        currentLangCode.textContent = langCode;

        // Mettre à jour les classes actives
        langOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');

        // Appeler la fonction de changement de langue
        changeLanguage(lang);

        // Fermer le menu
        langDropdown.classList.remove('open');
    });
});

// Toggle menu mobile
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');

navbarToggle.addEventListener('click', function () {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('.navbar-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
});

// Effet scroll
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight lien actif
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
