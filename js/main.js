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

    // Setup Settings Panel
    const setupSettingsPanel = () => {
        const settingsHtml = `
            <div class="settings-dropdown" id="settingsDropdown">
                <div class="settings-header">Cài đặt giao diện</div>
                
                <div class="settings-section">
                    <span class="settings-label">Chế độ hiển thị</span>
                    <button class="theme-toggle-btn" id="themeToggleBtn">
                        <span class="text" id="themeText" style="font-weight: 500;">Dark Mode</span>
                        <div class="toggle-switch">
                            <div class="toggle-thumb">
                                <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                                <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                            </div>
                        </div>
                    </button>
                </div>
                
                <div class="settings-section">
                    <span class="settings-label">Màu chủ đạo</span>
                    <div class="color-options">
                        <div class="color-swatch active" data-color="blue" style="background-color: #38bdf8;"></div>
                        <div class="color-swatch" data-color="orange" style="background-color: #f97316;"></div>
                        <div class="color-swatch" data-color="purple" style="background-color: #a855f7;"></div>
                        <div class="color-swatch" data-color="green" style="background-color: #10b981;"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', settingsHtml);
        
        const avatar = document.querySelector('.nav-profile-icon');
        const dropdown = document.getElementById('settingsDropdown');
        const themeBtn = document.getElementById('themeToggleBtn');
        const themeText = document.getElementById('themeText');
        const colorSwatches = document.querySelectorAll('.color-swatch');
        
        // Ensure initial load applies theme/color BEFORE showing page nicely
        const applyTheme = (isLight) => {
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
                themeText.textContent = 'Light Mode';
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeText.textContent = 'Dark Mode';
            }
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        };
        
        const colors = {
            blue: { signal: '#38bdf8', link: '#60a5fa' },
            orange: { signal: '#f97316', link: '#fb923c' },
            purple: { signal: '#a855f7', link: '#c084fc' },
            green: { signal: '#10b981', link: '#34d399' }
        };
        
        const applyColor = (colorName) => {
            if (!colors[colorName]) return;
            document.documentElement.style.setProperty('--color-signal-blue', colors[colorName].signal);
            document.documentElement.style.setProperty('--color-link-blue', colors[colorName].link);
            
            colorSwatches.forEach(swatch => {
                swatch.classList.toggle('active', swatch.dataset.color === colorName);
            });
            localStorage.setItem('portfolio-color', colorName);
        };

        // Load saved preferences
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') applyTheme(true);
        
        const savedColor = localStorage.getItem('portfolio-color');
        if (savedColor) applyColor(savedColor);
        
        // Event Listeners
        if(avatar) {
            avatar.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = avatar.getBoundingClientRect();
                dropdown.style.top = (rect.bottom + 12) + 'px';
                // calculate right to align with avatar's right edge
                const rightOffset = window.innerWidth - rect.right;
                dropdown.style.right = rightOffset + 'px';
                dropdown.classList.toggle('active');
            });
        }
        
        document.addEventListener('click', (e) => {
            if (dropdown && !dropdown.contains(e.target) && e.target !== avatar) {
                dropdown.classList.remove('active');
            }
        });
        
        themeBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') !== 'light';
            applyTheme(isLight);
        });
        
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                applyColor(swatch.dataset.color);
            });
        });
    };
    
    setupSettingsPanel();
    
    // Add subtle reveal animations if needed in the future
    console.log("Framer Portfolio initialized.");
});
