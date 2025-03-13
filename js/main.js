document.addEventListener('DOMContentLoaded', function() {
    // Burger-Menü Funktionalität
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-active');
            
            // Optional: Ändere das Burger-Icon zu einem X, wenn das Menü geöffnet ist
            const isMenuOpen = navMenu.classList.contains('nav-menu-active');
            this.innerHTML = isMenuOpen ? '✕' : '☰';
            
            // Zugänglichkeit verbessern
            this.setAttribute('aria-expanded', isMenuOpen);
        });
    }
    
    // Schließe das Menü, wenn außerhalb geklickt wird
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
            if (navMenu && navMenu.classList.contains('nav-menu-active')) {
                navMenu.classList.remove('nav-menu-active');
                if (menuToggle) {
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});
