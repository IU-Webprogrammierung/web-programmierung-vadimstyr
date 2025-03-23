document.addEventListener('DOMContentLoaded', function () {
    // Menü-Toggle Code
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#nav-menu');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-menu-active');
        this.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('nav-menu-active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Ripple-Effekt Code
    const buttons = document.querySelectorAll('.button, .nav-link, .impressum-link, .impressum-link-index, .impressum-link-kontakt, .impressum-link-lebenslauf, .project-button, .lebenslauf-link');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    function createRipple(event) {
        const button = event.currentTarget;

        // Entferne vorherige Ripples
        const ripples = button.getElementsByClassName('ripple');
        while (ripples.length > 0) {
            button.removeChild(ripples[0]);
        }

        // Erstelle das Ripple-Element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);

        // Positioniere das Ripple basierend auf dem Klick
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        // Entferne das Ripple nach der Animation
        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Lego-Block Animation Code - direkt hier, NICHT in einem weiteren DOMContentLoaded
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';

    const blocksContainer = document.createElement('div');
    blocksContainer.className = 'blocks-container';

    for (let i = 0; i < 100; i++) {
        const block = document.createElement('div');
        block.className = 'lego-block';
        const column = i % 10;
        block.style.animationDelay = `${column * 0.05}s`;
        blocksContainer.appendChild(block);
    }

    transitionElement.appendChild(blocksContainer);
    document.body.appendChild(transitionElement);

    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript"]):not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Wenn es ein interner Link ist
            if (href && !href.startsWith('http') && !href.startsWith('//')) {
                e.preventDefault();

                // Aktiviere die Aufbauanimation
                transitionElement.classList.add('active');

                // Verzögere, um die Aufbauanimation zu sehen
                setTimeout(() => {
                    // Aktiviere die Abbauanimation
                    transitionElement.classList.add('closing');

                    // Warte auf Ende der Abbauanimation, dann navigiere
                    setTimeout(() => {
                        window.location.href = href;
                    }, 700);
                }, 800);
            }
        });
    });
});