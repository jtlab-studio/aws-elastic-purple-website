/**
 * ElasticPurple v2 - Minimal JavaScript
 * Only functional interactions, no decorative animations
 */

// Theme Management
function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeButton(next);
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
    }
}

// Language Management
const translations = {
    en: {
        // Navigation
        navHome: "Home",
        navCredentials: "Credentials",
        navProjects: "Projects",
        navDocs: "Documentation",
        navBlog: "Blog",
        navContact: "Contact",

        // Hero
        heroIntro: "Cloud Engineer",
        heroTitle: "Building production infrastructure on AWS",
        heroDescription: "Cloud Engineer experienced in AWS, Terraform, and GitHub Actions CI/CD, with a background in Customer Success for cybersecurity and AI/ML platforms.",
        btnResume: "Resume",
        btnLinkedIn: "LinkedIn",
        btnGitHub: "GitHub",

        // Sections
        sectionCredentials: "Credentials",
        sectionProjects: "Projects",
        sectionSkills: "Technical Skills",
        viewAll: "View all →",

        // Credential groups
        groupCloud: "Cloud & Infrastructure",
        groupSecurity: "Security",
        groupAI: "AI / ML",

        // Statuses
        statusCompleted: "Completed",
        statusInProgress: "In Progress",

        // Project
        project1Title: "Cloud Portfolio Infrastructure",
        project1Desc: "Serverless 3-tier application on AWS. S3 static hosting, CloudFront CDN, Lambda + DynamoDB visitor counter. Fully managed with Terraform and deployed via GitHub Actions.",
        linkDocs: "Documentation",
        linkCode: "Source Code",

        // Footer
        footerCopy: "© 2026 Andrew J.",
        footerBuilt: "Built with AWS, Terraform, and too much coffee."
    },
    de: {
        // Navigation
        navHome: "Start",
        navCredentials: "Qualifikationen",
        navProjects: "Projekte",
        navDocs: "Dokumentation",
        navBlog: "Blog",
        navContact: "Kontakt",

        // Hero
        heroIntro: "Cloud Engineer",
        heroTitle: "Production Infrastructure auf AWS",
        heroDescription: "Cloud Engineer mit Erfahrung in AWS, Terraform und GitHub Actions CI/CD, mit Hintergrund im Customer Success für Cybersecurity- und AI/ML-Plattformen.",
        btnResume: "Lebenslauf",
        btnLinkedIn: "LinkedIn",
        btnGitHub: "GitHub",

        // Sections
        sectionCredentials: "Qualifikationen",
        sectionProjects: "Projekte",
        sectionSkills: "Technische Skills",
        viewAll: "Alle anzeigen →",

        // Credential groups
        groupCloud: "Cloud & Infrastructure",
        groupSecurity: "Security",
        groupAI: "AI / ML",

        // Statuses
        statusCompleted: "Abgeschlossen",
        statusInProgress: "In Bearbeitung",

        // Project
        project1Title: "Cloud Portfolio Infrastructure",
        project1Desc: "Serverless 3-Tier Application auf AWS. S3 Static Hosting, CloudFront CDN, Lambda + DynamoDB Visitor Counter. Vollständig managed mit Terraform und deployed via GitHub Actions.",
        linkDocs: "Dokumentation",
        linkCode: "Source Code",

        // Footer
        footerCopy: "© 2026 Andrew J.",
        footerBuilt: "Gebaut mit AWS, Terraform, und zu viel Kaffee."
    }
};

function initLanguage() {
    const saved = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('lang', saved);
    updateContent(saved);
    updateLanguageButton(saved);
}

function toggleLanguage() {
    const current = document.documentElement.getAttribute('lang') || 'en';
    const next = current === 'en' ? 'de' : 'en';
    document.documentElement.setAttribute('lang', next);
    localStorage.setItem('language', next);
    updateContent(next);
    updateLanguageButton(next);
}

function updateLanguageButton(lang) {
    const btn = document.getElementById('langToggle');
    if (btn) {
        btn.textContent = lang === 'en' ? 'DE' : 'EN';
    }
}

function updateContent(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
}

// Mobile Menu
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar?.classList.remove('active');
    overlay?.classList.remove('active');
}

// Visitor Counter (minimal, no animation)
async function loadVisitorCount() {
    const el = document.getElementById('visitorCount');
    if (!el) return;

    try {
        const response = await fetch(
            'https://sv7nz6uz6uc4z65ayjqa2v7vgi0tpmcv.lambda-url.eu-central-1.on.aws/',
            { method: 'GET' }
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        const count = data.visits ?? data.count;

        if (typeof count === 'number') {
            el.textContent = count.toLocaleString();
        }
    } catch (e) {
        console.error('Visitor count error:', e);
        el.textContent = '—';
    }
}

// Active Navigation
function updateActiveNav() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkFile = href.split('/').pop();
        link.classList.toggle('active', linkFile === filename);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    updateActiveNav();
    loadVisitorCount();

    // Close sidebar on overlay click
    document.getElementById('sidebarOverlay')?.addEventListener('click', closeSidebar);

    // Close sidebar on nav link click (mobile)
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeSidebar();
            }
        });
    });
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        closeSidebar();
    }
});