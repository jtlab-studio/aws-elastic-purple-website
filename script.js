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

    // Calculate when expertise section is almost at top (with 100px buffer)
    const fadeStartPoint = expertiseSectionTop - windowHeight + 200;
    const fadeEndPoint = expertiseSectionTop - 100;

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

// Visitor Counter
async function updateVisitorCount() {
    const counterElement = document.getElementById('visitorCount');

    try {
        // For now, use a simple counter stored in localStorage
        // In production, this would call your API/Lambda function
        let count = localStorage.getItem('visitorCount');

        if (!count) {
            count = Math.floor(Math.random() * 1000) + 500; // Start with a random number
        } else {
            count = parseInt(count) + 1;
        }

        localStorage.setItem('visitorCount', count);

        // Animate the counter
        animateCounter(counterElement, 0, count, 1000);

        // TODO: Replace with actual API call
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const data = await response.json();
        // animateCounter(counterElement, 0, data.count, 1000);

    } catch (error) {
        console.error('Error fetching visitor count:', error);
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
});