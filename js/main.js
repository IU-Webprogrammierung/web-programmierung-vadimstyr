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

// ========================================================================
// START: Kollabierbare CV-Beschreibungen für mobile Geräte
// ========================================================================
document.addEventListener('DOMContentLoaded', function () {
    // Funktion zum Initialisieren oder Entfernen der Listener
    const setupAccordion = () => {
        const isMobile = window.innerWidth <= 640;
        // ******** WICHTIG: HIER MUSS '.cv-field' STEHEN! ********
        const triggers = document.querySelectorAll('.timeline-item .cv-field');
        // **********************************************************

        triggers.forEach(trigger => {
            const parentItem = trigger.closest('.timeline-item');
            const description = parentItem ? parentItem.querySelector('.cv-description') : null;

            // Entferne immer zuerst alte Listener und Attribute, um Fehler zu vermeiden
            trigger.removeEventListener('click', toggleDescriptionHandler);
            trigger.removeEventListener('keydown', keydownHandler); // Auch Keydown-Listener entfernen
            trigger.removeAttribute('role');
            trigger.removeAttribute('tabindex');
            trigger.removeAttribute('aria-expanded');
            if (description) {
                description.removeAttribute('aria-hidden');
                trigger.removeAttribute('aria-controls');
                const descId = description.id; // Alte ID holen
                if (descId && descId.startsWith('desc-')) { // Nur IDs entfernen, die wir generiert haben
                    description.id = '';
                }
            }


            if (isMobile && parentItem && description) {
                // Eindeutige ID für die Beschreibung erstellen (für ARIA), falls nicht vorhanden
                let descId = description.id;
                if (!descId || !descId.startsWith('desc-')) {
                   descId = 'desc-' + Math.random().toString(36).substr(2, 9);
                   description.id = descId;
                }

                // Mache den Trigger (.cv-field) zugänglich
                trigger.setAttribute('role', 'button');
                trigger.setAttribute('tabindex', '0');
                trigger.setAttribute('aria-controls', descId);

                // Initialen Zustand setzen (standardmäßig geschlossen)
                // Stelle sicher, dass die Klasse beim Initialisieren entfernt wird
                parentItem.classList.remove('description-visible');
                trigger.setAttribute('aria-expanded', 'false');
                description.setAttribute('aria-hidden', 'true');

                // Event Listener hinzufügen
                trigger.addEventListener('click', toggleDescriptionHandler);
                trigger.addEventListener('keydown', keydownHandler); // Listener für Tastatur hinzufügen

            } else if (parentItem) {
                 // Desktop-Reset (Klasse entfernen, Listener sind ja schon weg)
                parentItem.classList.remove('description-visible');
                 // Optional: Inline-Styles zurücksetzen, falls alte Skripte welche gesetzt haben
                 if (description) {
                   description.style.maxHeight = '';
                   description.style.opacity = '';
                   description.style.padding = '';
                   description.style.margin = '';
                 }
            }
        });
    };

    // Handler für Klick-Ereignisse
    function toggleDescriptionHandler(event) {
        const trigger = event.currentTarget; // Das geklickte Element (jetzt .cv-field)
        const parentItem = trigger.closest('.timeline-item'); // Finde das übergeordnete Item

        if (parentItem) {
            const description = parentItem.querySelector('.cv-description'); // Finde die Beschreibung darin
            const isExpanded = parentItem.classList.toggle('description-visible'); // Schalte die Klasse um

            // ARIA-Attribute aktualisieren
            trigger.setAttribute('aria-expanded', isExpanded);
             if(description) {
               description.setAttribute('aria-hidden', !isExpanded);
             }
        }
    }

    // Handler für Tastaturereignisse (Enter/Space auf dem .cv-field)
    function keydownHandler(e) {
      // Prüfen, ob Enter oder Leertaste gedrückt wurde
      if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault(); // Verhindert Standardaktionen (z.B. Scrollen bei Leertaste)
        // Rufe den Klick-Handler auf, als ob geklickt wurde
        // 'this' bezieht sich hier auf das Element, das den keydown-Listener hat (das .cv-field)
        toggleDescriptionHandler.call(this, e);
      }
    }

    // --- Initialisierung ---
    // Führe die Funktion beim ersten Laden aus
    setupAccordion();

    // Führe die Funktion erneut aus, wenn sich die Fenstergröße ändert
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        // Kurze Verzögerung, um nicht bei jeder Pixeländerung zu feuern
        resizeTimer = setTimeout(setupAccordion, 250);
    });
});
// ========================================================================
// ENDE: Kollabierbare CV-Beschreibungen für mobile Geräte
// ========================================================================