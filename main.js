/* ============================================================
   PORTFOLIO DÉVELOPPEUR DE JEUX VIDÉO — Script principal
   - Grille de jeux dynamique (basée sur un tableau de données)
   - Menu mobile (burger)
   - Lien de navigation actif au scroll
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1. BASE DE DONNÉES DES JEUX
   ------------------------------------------------------------
   👉 POUR AJOUTER UN JEU : copiez un bloc { ... } ci-dessous,
      ajoutez l'image dans /assets/images, et c'est tout !
   ------------------------------------------------------------ */
const games = [
    {
        title: "Donjon De L'Ombre",
        description: "Une courte description du jeu, son genre et ce qui le rend unique. Restez concis pour garder la carte lisible.",
        image: "assets/images/game1.webp",
        tag: "Role Playing",
        link: "https://jhawks225.itch.io/donjon-de-lombre"
    },
    {
        title: "in progess",
        description: "in progress",
        image: "assets/images/img2.webp",
        tag: "Plateforme",
        link: "https://jhawks225.itch.io/nom-du-jeu-2"
    },
    {
        title: "in progress",
        description: "in progress",
        image: "assets/images/img3.webp",
        tag: "Puzzle",
        link: "https://jhawks225.itch.io/nom-du-jeu-3"
    }
];

/* ------------------------------------------------------------
   2. GÉNÉRATION DES CARTES DE JEUX
   ------------------------------------------------------------ */
function createGameCard(game) {
    const article = document.createElement('article');
    article.className = 'game-card';

    article.innerHTML = `
        <div class="game-card-media">
            ${game.tag ? `<span class="game-card-tag">${game.tag}</span>` : ''}
            <img src="${game.image}" alt="Screenshot du jeu ${game.title}" loading="lazy">
        </div>
        <div class="game-card-body">
            <h3 class="game-card-title">${game.title}</h3>
            <p class="game-card-desc">${game.description}</p>
            <a class="game-card-cta" href="${game.link}" target="_blank" rel="noopener noreferrer">
                Télécharger <span aria-hidden="true">→</span>
            </a>
        </div>
    `;

    return article;
}

function renderGames() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    games.forEach(game => fragment.appendChild(createGameCard(game)));
    grid.appendChild(fragment);
}

/* ------------------------------------------------------------
   3. MENU MOBILE (burger)
   ------------------------------------------------------------ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    const closeMenu = () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    // Fermer le menu quand on clique sur un lien
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

/* ------------------------------------------------------------
   4. LIEN DE NAVIGATION ACTIF AU SCROLL
   ------------------------------------------------------------ */
function initScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('active', isActive);
                });
            }
        });
    }, {
        rootMargin: '-45% 0px -50% 0px'  // déclenche au milieu de l'écran
    });

    sections.forEach(section => observer.observe(section));
}

/* ------------------------------------------------------------
   5. ANNÉE DYNAMIQUE DU FOOTER
   ------------------------------------------------------------ */
function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   6. INITIALISATION
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    initMobileMenu();
    initScrollSpy();
    initFooterYear();
});
