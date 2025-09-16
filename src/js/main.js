// src/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    /**
     * --- Theme Toggle Logic ---
     * Toggles between light and dark themes and saves the preference to localStorage.
     */
    const initializeTheme = () => {
        const toggleButton = document.getElementById('theme-toggle-floating');
        if (!toggleButton) return;

        toggleButton.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    };

    /**
     * --- Mobile Menu Logic ---
     * Toggles the visibility of the mobile navigation menu.
     */
    const initializeMobileMenu = () => {
        const toggleButton = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const openIcon = document.getElementById('menu-icon-open');
        const closeIcon = document.getElementById('menu-icon-close');

        if (!toggleButton || !mobileMenu || !openIcon || !closeIcon) return;

        toggleButton.addEventListener('click', () => {
            const isVisible = mobileMenu.classList.contains('visible');
            if (isVisible) {
                mobileMenu.classList.add('opacity-0', 'invisible');
                mobileMenu.classList.remove('opacity-100', 'visible');
                document.body.style.overflow = '';
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('opacity-0', 'invisible');
                mobileMenu.classList.add('opacity-100', 'visible');
                document.body.style.overflow = 'hidden';
                openIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    };

    /**
     * --- Scroll to Top Logic ---
     * Shows a "scroll to top" button when the user scrolls down the page.
     */
    const initializeScrollToTop = () => {
        const btn = document.getElementById('scroll-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('opacity-100', 'visible');
                btn.classList.remove('opacity-0', 'invisible');
            } else {
                btn.classList.remove('opacity-100', 'visible');
                btn.classList.add('opacity-0', 'invisible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    /**
     * --- Reading Progress Bar Logic ---
     * Updates a progress bar based on the scroll position within an article.
     */
    const initializeReadingProgress = () => {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;

        const updateProgress = () => {
            const contentElement = document.querySelector('article');
            if (!contentElement) {
                progressBar.style.width = '0%';
                return;
            }
            const totalHeight = contentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call
    };

    /**
     * --- Sticky Header Logic ---
     * Adds a 'scrolled' class to the header when the page is scrolled.
     */
    const initializeStickyHeader = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };
    
    // --- Initialize All Scripts ---
    initializeTheme();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeReadingProgress();
    initializeStickyHeader();

    // --- INITIALIZE ANIMATE ON SCROLL ---
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });
});
