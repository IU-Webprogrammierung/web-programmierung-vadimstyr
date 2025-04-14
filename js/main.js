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




// Nur für mobile Geräte - CV-Beschreibung als Modal
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 640) {
      const cvFields = document.querySelectorAll('.cv-field');
      const modal = document.getElementById('cv-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalDescription = document.getElementById('modal-description');
      const closeButton = document.querySelector('.modal-close');
      
      // Klick-Handler für CV-Felder
      cvFields.forEach(field => {
        field.addEventListener('click', function() {
          const content = field.closest('.timeline-content');
          const title = content.querySelector('.cv-title').textContent;
          const description = content.querySelector('.cv-description').innerHTML;
          
          // Modal mit Inhalt füllen
          modalTitle.textContent = title;
          modalDescription.innerHTML = description;
          
          // Modal anzeigen
          modal.classList.add('show');
          document.body.style.overflow = 'hidden'; // Verhindern von Hintergrund-Scrolling
        });
      });
      
      // Modal schließen
      closeButton.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Hintergrund-Scrolling wieder aktivieren
      });
      
      // Modal schließen bei Klick außerhalb des Inhalts
      window.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    }
  });
// In main.js - verbesserte Version
document.addEventListener('DOMContentLoaded', function() {
    const profileContainers = document.querySelectorAll('.profile-picture-container');
    
    profileContainers.forEach(container => {
        // Container quadratisch machen
        container.style.aspectRatio = "1/1";
        container.classList.add('js-animation');
        
        // Elemente erstellen
        const stripes = document.createElement('div');
        stripes.className = 'rotating-stripes';
        
        const spacer = document.createElement('div');
        spacer.className = 'white-spacer';
        
        // Elemente in der richtigen Reihenfolge einfügen
        // Wichtig: stripes muss VOR spacer eingefügt werden damit die Animation sichtbar ist
        container.insertBefore(stripes, container.firstChild);
        container.insertBefore(spacer, container.firstChild);
    });
});

// Text-Animation für me-subtitle - buchstabenweise
document.addEventListener('DOMContentLoaded', function() {
    const subtitle = document.getElementById('me-subtitle');
    
    if (subtitle) {
        // Aktuellen Text holen
        const text = subtitle.innerText;
        let animatedHTML = '';
        let delay = 0;
        let charIndex = 0;
        
        // Durch jeden Buchstaben des Textes iterieren
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            if (char === '\n') {
                // Zeilenumbrüche beibehalten
                animatedHTML += '<br>';
                delay += 0.1; // Kurze Pause nach Zeilenumbruch
            } else if (char === ' ') {
                // Leerzeichen beibehalten, aber keine Animation
                animatedHTML += ' ';
                delay += 0.05; // Kurze Pause bei Leerzeichen
            } else {
                // Jeder Buchstabe bekommt seine eigene Animation mit verzögertem Start
                animatedHTML += `<span class="animated-char" 
                                      style="animation-delay: ${delay}s;">
                                      ${char}
                                 </span>`;
                delay += 0.08; // Delay zwischen Buchstaben (vorher 0.2 für Wörter)
                charIndex++;
            }
        }
        
        // Ersetze den Originaltext durch die animierten Spans
        subtitle.innerHTML = animatedHTML;
    }
});