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

    // Seitenübergangs-Animation
    // Füge page-transition Element zum DOM hinzu
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);

    // Warte, bis alles geladen ist
    setTimeout(() => {
        // Erfasse alle Links, die zu internen Seiten führen
        const internalLinks = document.querySelectorAll('a[href^="html/"], a[href^="/"], a[href^="./"], a[href^="../"], a[href="index.html"]');

        internalLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                // Vermeide Standard-Navigation
                event.preventDefault();

                const targetUrl = this.getAttribute('href');

                // Aktiviere die Übergangsanimation
                transitionElement.classList.add('active');

                // Warte, bis die Animation abgeschlossen ist, dann navigiere zur Zielseite
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 800); // Entspricht der Animationsdauer (0.8s)
            });
        });
    }, 100);
});

// Animation beim Laden der Seite
window.addEventListener('pageshow', function (event) {
    // Überprüfe, ob die Seite aus dem Cache geladen wird
    if (event.persisted) {
        location.reload();
    } else {
        const transitionElement = document.querySelector('.page-transition');
        if (transitionElement) {
            // Entferne die Animation nach dem Seitenladen mit leichter Verzögerung
            setTimeout(() => {
                transitionElement.classList.remove('active');
            }, 100);
        }
    }
});

// Zertifikate-Button - ausklappen von Zertufikaten

document.addEventListener('DOMContentLoaded', () => {
    const certToggle = document.querySelector('.certificates-toggle');

    if (certToggle) {
        certToggle.addEventListener('click', () => {
            certToggle.classList.toggle('active');
        });
    }
});

// Social Media Icons Animation
document.addEventListener('DOMContentLoaded', function () {
    const socialLinks = document.querySelectorAll('.social-media-buttons-profile .social-media-link');

    // Klassennamen für die Farben hinzufügen
    const colorClasses = ['color-vavira', 'color-github', 'color-xing', 'color-linkedin', 'color-mail'];

    // Animation starten mit Verzögerung
    setTimeout(() => {
        socialLinks.forEach((link, index) => {
            // Farbklasse hinzufügen
            link.classList.add(colorClasses[index]);

            // Animation starten
            link.classList.add('animate');

            // Farbklasse nach Abschluss der Animation entfernen
            setTimeout(() => {
                link.classList.remove(colorClasses[index]);
            }, 1200); // 1.2 Sekunden (Animation + maximale Verzögerung)
        });
    }, 500); // 500ms Verzögerung nach dem Laden der Seite
});

// Kollabierbare CV-Beschreibungen für mobile Geräte
document.addEventListener('DOMContentLoaded', function () {
    // Nur auf mobilen Geräten ausführen
    if (window.innerWidth <= 640) {
        const cvFields = document.querySelectorAll('.cv-field');

        // Sicherstellen, dass die CV-Beschreibungen anfangs versteckt sind
        document.querySelectorAll('.cv-description').forEach(desc => {
            desc.style.maxHeight = '0';
            desc.style.opacity = '0';
            desc.style.paddingTop = '0';
            desc.style.paddingBottom = '0';
        });

        cvFields.forEach(field => {
            // Klick-Ereignis sowohl auf dem Feld als auch auf dem Plus-Symbol
            field.addEventListener('click', toggleDescription);

        });
    } // Hier fehlt die schließende Klammer
});