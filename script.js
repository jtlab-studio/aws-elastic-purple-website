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

function toggleDescription(button) {
    const certItem = button.parentElement;
    const description = certItem.querySelector('.cert-description');
    
    if (description.style.display === 'none') {
        description.style.display = 'block';
        button.textContent = '✕ Less Info';
    } else {
        description.style.display = 'none';
        button.textContent = 'ℹ️ More Info';
    }
}

function toggleExperience(button) {
    const timelineItem = button.parentElement;
    const experienceText = timelineItem.querySelector('.experience-text');
    
    if (experienceText.classList.contains('collapsed')) {
        experienceText.classList.remove('collapsed');
        experienceText.classList.add('expanded');
        button.textContent = '- Show less';
    } else {
        experienceText.classList.add('collapsed');
        experienceText.classList.remove('expanded');
        button.textContent = '+ Read more';
    }
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
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
});