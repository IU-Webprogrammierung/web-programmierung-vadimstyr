document.addEventListener('DOMContentLoaded', function () {
    // Select the menu toggle button
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Select the navigation menu
    const navMenu = document.querySelector('#nav-menu');
    
    // Add click event listener to menu toggle
    menuToggle.addEventListener('click', function () {
        // Toggle the "nav-menu-active" class on the nav menu
        navMenu.classList.toggle('nav-menu-active');
        
        // Toggle the "active" class on the button itself (für X-Symbol)
        this.classList.toggle('active');
        
        // Check if menu is expanded for accessibility
        const isExpanded = navMenu.classList.contains('nav-menu-active');
        
        // Update aria-expanded attribute for accessibility
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
});