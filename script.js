// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.querySelector('.theme-toggle');

    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Sidebar Toggle for Mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger');
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Certificate Description Toggle
function toggleDescription(button) {
    const certItem = button.closest('.cert-item');
    const description = certItem.querySelector('.cert-description');

    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'block';
        button.textContent = '- Less';
    } else {
        description.style.display = 'none';
        button.textContent = '+ More';
    }
}

// Active Navigation Highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Fade out pillar cards when scrolling to expertise section
function handlePillarFade() {
    const pillarsGrid = document.querySelector('.pillars-grid');
    const expertiseSection = document.getElementById('expertise');

    if (!pillarsGrid || !expertiseSection) return;

    const scrollPosition = window.pageYOffset;
    const expertiseSectionTop = expertiseSection.offsetTop;
    const windowHeight = window.innerHeight;

    // Calculate when expertise section is almost at top - very short distance for fast fade (3 scroll nudges ~= 300-400px)
    const fadeStartPoint = expertiseSectionTop - windowHeight + 100;
    const fadeEndPoint = expertiseSectionTop - windowHeight + 400;

    if (scrollPosition >= fadeStartPoint && scrollPosition <= fadeEndPoint) {
        // Calculate opacity based on scroll position
        const fadeProgress = (scrollPosition - fadeStartPoint) / (fadeEndPoint - fadeStartPoint);
        const opacity = 1 - fadeProgress;
        pillarsGrid.style.opacity = opacity;
        pillarsGrid.style.transform = `translateY(-${fadeProgress * 20}px)`;
    } else if (scrollPosition > fadeEndPoint) {
        pillarsGrid.style.opacity = '0';
        pillarsGrid.style.transform = 'translateY(-20px)';
    } else {
        pillarsGrid.style.opacity = '1';
        pillarsGrid.style.transform = 'translateY(0)';
    }
}


// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                // If target section exists, scroll to it
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close sidebar on mobile after clicking
                    if (window.innerWidth <= 768) {
                        toggleSidebar();
                    }
                } else {
                    // For placeholder links (project-articles, blog, contact), just prevent default
                    e.preventDefault();
                    console.log(`Section "${targetId}" is a placeholder - not yet implemented`);

                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        toggleSidebar();
                    }
                }
            }
        });
    });
}

async function updateVisitorCount() {
    const counterElement = document.getElementById('visitorCount');

    try {
        const response = await fetch(
            'https://sv7nz6uz6uc4z65ayjqa2v7vgi0tpmcv.lambda-url.eu-central-1.on.aws/',
            { method: 'GET' }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Lambda Function URL returns the body directly
        const count = data.visits ?? data.count;

        if (typeof count !== 'number') {
            throw new Error('Invalid response format');
        }

        animateCounter(counterElement, 0, count, 1000);

    } catch (error) {
        console.error('Visitor counter error:', error);
        counterElement.textContent = '---';
    }
}


// Animate Counter
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Close sidebar when clicking outside on mobile
function setupOutsideClick() {
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.querySelector('.hamburger');

        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggleSidebar();
        }
    });
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.querySelector('.theme-toggle');

    // Default to dark theme if no preference is saved
    if (!savedTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        btn.textContent = '🌙';
    }
}

// Parallax effect on scroll (subtle)
// Parallax effect disabled - hero should not move on scroll
// function setupParallax() {
//     window.addEventListener('scroll', () => {
//         const scrolled = window.pageYOffset;
//         const parallaxElements = document.querySelectorAll('.hero');
//
//         parallaxElements.forEach(el => {
//             const speed = 0.5;
//             el.style.transform = `translateY(${scrolled * speed}px)`;
//         });
//     });
// }

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    setupSmoothScroll();
    setupOutsideClick();
    updateVisitorCount();
    // setupParallax(); // Disabled - hero should not move on scroll

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        updateActiveNav();
        handlePillarFade();
    });

    // Initial active nav update
    updateActiveNav();

    // Handle window resize
    window.addEventListener('resize', () => {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.querySelector('.hamburger');

        // Reset sidebar state on resize to desktop
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cert-item, .project-card, .pillar-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe pillar headers for glow effect
    const pillarHeaders = document.querySelectorAll('.pillar-header');
    pillarHeaders.forEach(header => {
        observer.observe(header);
    });
});

// Add glow effect to pillar headers, project cards, and section titles when they come into view
const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.target.classList.contains('pillar-header') ||
            entry.target.classList.contains('project-card') ||
            entry.target.classList.contains('section-title')) {
            if (entry.isIntersecting) {
                entry.target.classList.add('glow-active');
            } else {
                entry.target.classList.remove('glow-active');
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize glow observer
document.addEventListener('DOMContentLoaded', () => {
    const pillarHeaders = document.querySelectorAll('.pillar-header');
    pillarHeaders.forEach(header => {
        glowObserver.observe(header);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        glowObserver.observe(card);
    });

    const sectionTitles = document.querySelectorAll('#projects .section-title, #about .section-title');
    sectionTitles.forEach(title => {
        glowObserver.observe(title);
    });
});