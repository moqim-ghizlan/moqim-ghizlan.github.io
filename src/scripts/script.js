// ================================
// THEME TOGGLE
// ================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Load theme: saved > system preference > default light
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

// Apply current theme
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon depending on the current mode
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ================================
// SMOOTH SCROLLING + NAVBAR TOGGLE
// ================================
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navbar = document.getElementById('navbar');

// Toggle mobile navbar
navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

// Smooth scrolling for internal links
document.querySelectorAll('.navbar-link[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const offset = target.offsetTop - navbarHeight - 20;
            window.scrollTo({ top: offset, behavior: 'smooth' });
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// Highlight current section in navbar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link[href^="#"]');
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ================================
// LANGUAGE DROPDOWN
// ================================
const langSelector = document.getElementById('lang-selector');
const langDropdown = document.querySelector('.language-dropdown');
const langOptions = document.querySelectorAll('.lang-option');
const currentLangFlag = document.getElementById('current-lang-flag');
const currentLangCode = document.getElementById('current-lang-code');

// Toggle dropdown open/close
langSelector.addEventListener('click', e => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', e => {
    if (!langDropdown.contains(e.target)) langDropdown.classList.remove('open');
});

// Handle language change
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        const flag = option.dataset.flag;

        // Update current display
        currentLangFlag.textContent = flag;
        currentLangCode.textContent = lang.toUpperCase();

        // Update active class
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        // Call translation function (from translation.js)
        applyLanguage(lang);

        // Close dropdown
        langDropdown.classList.remove('open');
    });
});
