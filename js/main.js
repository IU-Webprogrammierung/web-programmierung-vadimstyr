document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('nav-menu-active');

    // Für Barrierefreiheit (WAI-ARIA)
    const isExpanded = navMenu.classList.contains('nav-menu-active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });
});
