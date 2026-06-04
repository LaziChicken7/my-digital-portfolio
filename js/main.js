document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Add subtle reveal animations if needed in the future
    console.log("Framer Portfolio initialized.");
});
