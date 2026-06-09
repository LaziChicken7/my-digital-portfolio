document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Make school logo clickable
    const schoolLogo = document.querySelector('.school-logo');
    if (schoolLogo) {
        schoolLogo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Spotlight mouse hover effect for cards
    const spotlightElements = document.querySelectorAll('.mc-card, .rule-card, .mc-hover-block, .prompt-box, .output-box, .floating-nav');
    spotlightElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Add subtle reveal animations if needed in the future
    console.log("Framer Portfolio initialized.");
});
