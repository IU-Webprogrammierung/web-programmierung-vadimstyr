// Dieser Code steuert das mobile Menü (Hamburger-Menü) und den Ripple-Effekt für Buttons:
//
// 1. Menü-Toggle:
//    - Öffnet und schließt das mobile Navigationsmenü, wenn auf das Menü-Icon geklickt wird.
//    - Wechselt die Sichtbarkeit des Menüs und den aktiven Zustand des Icons.
//    - Setzt das aria-expanded-Attribut für Barrierefreiheit.
//
// 2. Ripple-Effekt:
//    - Fügt bei Klick auf Buttons und bestimmte Links einen animierten "Ripple"-Effekt hinzu.
//    - Der Effekt breitet sich vom Klickpunkt aus und verschwindet nach kurzer Zeit wieder.
//    - Vorherige Ripple-Elemente werden entfernt, damit immer nur ein Effekt sichtbar ist.

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


// Seitenübergangs-Animation:
// Fügt beim Klick auf interne Links eine sanfte Übergangsanimation ein.
// Beim Klick auf einen Link wird die Standard-Navigation verhindert, eine Overlay-Animation gestartet
// und nach Abschluss der Animation (0.8s) zur Zielseite navigiert.
// Das sorgt für einen flüssigen, modernen Seitenwechsel-Effekt.

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


// Animation beim Laden der Seite:
// Stellt sicher, dass die Seitenübergangs-Animation korrekt angezeigt wird.
// Wenn die Seite aus dem Cache geladen wird (z.B. beim Zurück-Navigieren), wird sie neu geladen,
// damit die Animation erneut abgespielt werden kann.
// Nach dem Laden der Seite wird das Overlay für die Seitenübergangs-Animation mit kurzer Verzögerung entfernt,
// sodass der Inhalt sichtbar wird.
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


// Zertifikate-Button - ausklappen von Zertifikaten:
// Steuert das Ein- und Ausklappen der Zertifikate-Liste auf der Seite.
// Beim Klick auf den Toggle-Button wird die Klasse "active" hinzugefügt oder entfernt,
// wodurch die Zertifikate sichtbar oder versteckt werden (z.B. für mobile Ansicht).

document.addEventListener('DOMContentLoaded', () => {
    const certToggle = document.querySelector('.certificates-toggle');

    if (certToggle) {
        certToggle.addEventListener('click', () => {
            certToggle.classList.toggle('active');
        });
    }
});

// Social Media Icons Animation:
// Animiert die Social Media Icons im Profilbereich beim Laden der Seite.
// Jedem Icon wird kurzzeitig eine Farbklasse und die Klasse "animate" zugewiesen,
// wodurch ein Pop- und Farbeffekt ausgelöst wird. Nach der Animation wird die Farbklasse wieder entfernt.
// Die Animation startet mit einer kurzen Verzögerung nach dem Seitenladen.
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




// Nur für mobile Geräte - CV-Beschreibung als Modal:
// Zeigt die Beschreibung eines Lebenslauf-Eintrags als Modal an, wenn auf das Feld geklickt wird (nur bei mobiler Ansicht).
// Beim Klick auf ein .cv-field wird das Modal mit Titel und Beschreibung gefüllt und angezeigt.
// Das Modal kann über den Schließen-Button oder durch Klick außerhalb des Inhalts wieder geschlossen werden.
// Während das Modal geöffnet ist, wird das Hintergrund-Scrolling deaktiviert.
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


// Profilbild-Animation (rotierende Streifen):
// Fügt jedem .profile-picture-container beim Laden der Seite animierte, rotierende Streifen hinzu.
// Erstellt dazu zwei zusätzliche Elemente (rotating-stripes und white-spacer) und fügt sie in der richtigen Reihenfolge ein.
// Die Streifen rotieren um das Profilbild und sorgen für einen modernen Animationseffekt.
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


// Text-Animation für me-subtitle - buchstabenweise:
// Animiert den Text im Element mit der ID "me-subtitle", indem jeder Buchstabe einzeln mit Verzögerung erscheint.
// Jeder Buchstabe wird in ein <span> mit einer individuellen animation-delay gepackt.
// Zeilenumbrüche und Leerzeichen werden korrekt behandelt, sodass der Text natürlich animiert wirkt.
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

// Dark Mode Toggle:
// Schaltet zwischen hellem und dunklem Design durch Klick auf den Moon-Button.
// Fügt dem HTML-Element die Klasse 'dark-mode' hinzu oder entfernt sie, 
// was automatisch die CSS-Variablen für Farben und Schatten ändert.
document.getElementById('darkmode-toggle').onclick = function() {
    document.documentElement.classList.toggle('dark-mode');
};