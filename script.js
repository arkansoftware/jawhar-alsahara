// DOM Elements
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const langSwitchBtn = document.getElementById('lang-switch');
const currentLangSpan = document.getElementById('current-lang');
const htmlElem = document.documentElement;

// ==========================
// SCROLL HEADER BACKGROUND
// ==========================
function scrollHeader() {
    if (this.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', scrollHeader);

// ==========================
// MOBILE MENU TOGGLE
// ==========================
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking any nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ==========================
// LANGUAGE SWITCHER
// ==========================
// Get language from local storage or default to 'ar'
let currentLang = localStorage.getItem('site_lang') || 'ar';

function applyLanguage(lang) {
    // Set HTML attributes
    htmlElem.setAttribute('lang', lang);
    htmlElem.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update button text
    currentLangSpan.textContent = lang === 'ar' ? 'EN' : 'عربي';
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-en][data-ar]');
    translatableElements.forEach(el => {
        // If it's an input or textarea with placeholder
        if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', el.getAttribute(`data-${lang}`));
        } else {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });

    // Save to local storage
    localStorage.setItem('site_lang', lang);
}

// Initialize language on load
applyLanguage(currentLang);

langSwitchBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
});

// ==========================
// SCROLL REVEAL ANIMATIONS
// ==========================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: observer.unobserve(entry.target); // Unobserve if you only want it to animate once
        } else {
            // Remove active class if you want it to animate again when scrolling up
            entry.target.classList.remove('active');
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});
