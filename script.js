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
    const certItem = button.parentElement;
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
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');

        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    setupSmoothScroll();
    setupOutsideClick();
    updateVisitorCount();
    setupParallax();

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

// Carousel Functionality - True Infinite Scroll
let currentSlide = 1; // Start at first real slide (index 1, because 0 is clone)
const totalSlides = 3; // Number of real projects
let isTransitioning = false;

// Initialize carousel position
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    // Position at first real slide (skip the clone at the beginning)
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
});

function moveCarousel(direction) {
    if (isTransitioning) return;
    isTransitioning = true;

    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    // Remove active class
    items.forEach(item => item.classList.remove('active'));

    // Move to next/previous slide
    currentSlide += direction;

    // Animate the transition
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Add active class to current visible slide
    items[currentSlide].classList.add('active');

    // Update indicators (map to real project indices)
    const realIndex = getRealIndex(currentSlide);
    indicators.forEach((ind, idx) => {
        ind.classList.toggle('active', idx === realIndex);
    });

    // Handle the seamless loop after transition
    setTimeout(() => {
        track.style.transition = 'none';

        // If we're at the clone after last real slide, jump to first real slide
        if (currentSlide === totalSlides + 1) {
            currentSlide = 1;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            items.forEach(item => item.classList.remove('active'));
            items[currentSlide].classList.add('active');
        }

        // If we're at the clone before first real slide, jump to last real slide
        if (currentSlide === 0) {
            currentSlide = totalSlides;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            items.forEach(item => item.classList.remove('active'));
            items[currentSlide].classList.add('active');
        }

        isTransitioning = false;
    }, 500);
}

function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    // Remove active class
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    // Set to real slide (index + 1 because of leading clone)
    currentSlide = index + 1;

    // Animate
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Add active class
    items[currentSlide].classList.add('active');
    indicators[index].classList.add('active');

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function getRealIndex(slideIndex) {
    // Map carousel position to real project index (0, 1, 2)
    if (slideIndex === 0) return 2; // Clone of last project
    if (slideIndex === totalSlides + 1) return 0; // Clone of first project
    return slideIndex - 1; // Real projects
}