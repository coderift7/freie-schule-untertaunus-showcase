(() => {
  'use strict';

  const areas = [
    {
      id: 'krippe',
      name: 'Krippe',
      text: 'Vertrauen fassen und erste Erfahrungen mit anderen Kindern machen.',
      room: 'Ein heller Raum mit weichen Kissen, Bausteinen und einer kleinen Spielecke.',
    },
    {
      id: 'kita',
      name: 'Kita',
      text: 'Gemeinsam spielen, Neues entdecken und Zeit mit Kindern unterschiedlichen Alters verbringen.',
      room: 'Ein farbenfroher Raum zum Spielen, Malen und Entdecken.',
    },
    {
      id: 'grundschule',
      name: 'Grundschule',
      path: 'grundschule-2',
      text: 'Eigenen Fragen nachgehen und zusammen lernen.',
      room: 'Ein Lernraum mit Büchern, Arbeitstisch und Materialien zum Forschen.',
    },
    {
      id: 'sekundarstufe',
      name: 'Sekundarstufe',
      text: 'Eigene Projekte verfolgen und Schritt für Schritt mehr Verantwortung übernehmen.',
      room: 'Ein Projektraum mit großem Tisch, Ideen und Materialien für gemeinsame Vorhaben.',
    },
    {
      id: 'teamer',
      name: 'Teamer',
      text: 'Lerne die Menschen kennen, die hier arbeiten und den Alltag an der Schule gestalten.',
      room: 'Ein gemeinsamer Raum mit Sofa, zwei Tassen auf einem kleinen Tisch und einer Pflanze.',
    },
  ];
  const home = document.querySelector('#home-view');
  const detail = document.querySelector('#detail-view');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const siteTitle = 'Freie Schule Untertaunus · Entwurf';
  let previousHash = '';

  function tourStops(current, isTour = true) {
    return `<ol class="tour-stops" aria-label="${isTour ? 'Stationen des Rundgangs' : 'Unsere Bereiche'}">${areas.map((area, index) => `<li><a href="#${isTour ? 'rundgang/' : ''}${area.id}"${area.id === current ? ` aria-current="${isTour ? 'step' : 'page'}"` : ''}><span class="stop-number" aria-hidden="true">0${index + 1}</span>${area.name}</a></li>`).join('')}</ol>`;
  }

  function roomScene(area, index) {
    return `<figure class="detail-art">
      <div class="room-stage" aria-label="Illustrativer Einblick: ${area.room}" role="img">
        <svg class="room-illustration" viewBox="0 0 600 400" aria-hidden="true"><use href="./assets/illustrations.svg#room-${area.id}"></use></svg>
        <div class="doorway" aria-hidden="true">
          <span class="door-leaf door-leaf-left"><svg viewBox="0 0 100 150"><use href="./assets/illustrations.svg#door-${area.id}"></use></svg></span>
          <span class="door-leaf door-leaf-right"><svg viewBox="0 0 100 150"><use href="./assets/illustrations.svg#door-${area.id}"></use></svg></span>
        </div>
      </div>
      <figcaption><span>0${index + 1} / Eine Tür zur ${area.id === 'teamer' ? 'Zusammenarbeit' : area.name}</span><span>Illustration · Entwurf</span></figcaption>
    </figure>`;
  }

  function renderArea(area, isTour) {
    const index = areas.indexOf(area);
    const next = areas[index + 1];
    const note =
      area.id === 'teamer'
        ? 'Hier ist Platz für die persönliche Vorstellung der Teamer.'
        : `Mehr über den Alltag in der ${area.name} erfährst du auf der offiziellen Schulwebsite.`;
    detail.innerHTML = `<section class="detail-page" aria-labelledby="detail-heading">
      <div class="detail-topline"><a class="back-link" href="#hof"><span aria-hidden="true">←</span> Zur Übersicht</a><span class="route-meta">${isTour ? `Rundgang · Station ${index + 1} von 5` : `Unser Hof · Tür 0${index + 1}`}</span></div>
      <div class="detail-grid">
        ${roomScene(area, index)}
        <div class="detail-copy">
          <p class="eyebrow">${area.id === 'teamer' ? 'Die Menschen an unserer Schule' : 'Ein kleiner Einblick'}</p>
          <h1 id="detail-heading" tabindex="-1">${area.name}</h1>
          <p class="detail-intro">${area.text}</p>
          <p class="detail-note">${note}</p>
          ${area.id !== 'teamer' ? `<a class="text-link" href="https://www.freie-schule-untertaunus.de/${area.path || area.id}/">Zur Bereichsseite <span aria-hidden="true">↗</span></a>` : ''}
          <div class="detail-actions"><a class="button button-outline" href="#aufnahme">Zur Aufnahme <span aria-hidden="true">→</span></a></div>
        </div>
      </div>
      ${isTour ? `<nav class="tour-navigation" aria-label="Rundgang fortsetzen">${tourStops(area.id)}<a class="button button-brick tour-next" href="${next ? `#rundgang/${next.id}` : '#rundgang/ende'}">${next ? `Weiter: ${next.name}` : 'Rundgang abschließen'} <span aria-hidden="true">→</span></a></nav>` : `<nav class="tour-navigation" aria-label="Weitere Türen"><div>${tourStops(area.id, false)}<a class="overview-link" href="#hof">Zurück auf den Hof</a></div><a class="button button-brick tour-next" href="#rundgang/krippe">Rundgang starten <span aria-hidden="true">→</span></a></nav>`}
    </section>`;
    document.title = `${area.name}${isTour ? ' · Rundgang' : ''} · ${siteTitle}`;
  }

  function renderEnd() {
    detail.innerHTML = `<section class="detail-page" aria-labelledby="detail-heading"><div class="detail-topline"><a class="back-link" href="#hof"><span aria-hidden="true">←</span> Der Hof</a><span class="route-meta">Rundgang · Wieder auf dem Hof</span></div><div class="tour-end"><svg class="end-mark" viewBox="0 0 48 48" aria-hidden="true"><use href="./assets/illustrations.svg#mark"></use></svg><p class="eyebrow">Fünf Türen. Viele Möglichkeiten.</p><h1 id="detail-heading" tabindex="-1">Du möchtest uns<br><em>kennenlernen?</em></h1><p>Unter „Aufnahme“ findest du den Ablauf und den Kontakt für deine Fragen.</p><div class="detail-actions"><a class="button button-brick" href="#aufnahme">Zur Aufnahme <span aria-hidden="true">→</span></a><a class="button button-outline" href="#hof">Zur Übersicht <span aria-hidden="true">↗</span></a></div>${tourStops('')}<p class="tour-end-note">Du kannst jede Tür jederzeit noch einmal öffnen.</p></div></section>`;
    document.title = `Rundgang abgeschlossen · ${siteTitle}`;
  }

  function focusHeading(selector) {
    const target = document.querySelector(selector);
    if (target) target.focus({ preventScroll: true });
  }

  function route(initial = false) {
    // Only known hashes become routes; unknown fragments return to the courtyard.
    const hash = window.location.hash.slice(1);
    const isTour = hash.startsWith('rundgang/');
    const id = isTour ? hash.slice('rundgang/'.length) : hash;
    const area = areas.find((item) => item.id === id);
    const isEnd = hash === 'rundgang/ende';
    const isDetail = Boolean(area || isEnd);
    home.hidden = isDetail;
    detail.hidden = !isDetail;
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const active =
        !isDetail && (hash === 'aufnahme' ? link.dataset.nav === 'aufnahme' : link.dataset.nav === 'hof');
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (area || isEnd) {
      if (area) renderArea(area, isTour);
      else renderEnd();
      window.scrollTo({ top: 0, behavior: 'instant' });
      focusHeading('#detail-heading');
    } else {
      document.title = `Ein Hof, viele Wege · ${siteTitle}`;
      if (hash === 'aufnahme') {
        focusHeading('#admission-heading');
        document
          .querySelector('#aufnahme')
          .scrollIntoView({
            behavior: initial || reducedMotion.matches ? 'instant' : 'smooth',
            block: 'start',
          });
      } else if (hash === 'inhalt') {
        document.querySelector('#inhalt').focus({ preventScroll: true });
      } else if (!initial) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        // Returning from a door restores the corresponding courtyard link.
        const previousId = previousHash.replace(/^rundgang\//, '');
        const previousArea = areas.find((item) => item.id === previousId);
        if (previousArea) {
          const portal = document.querySelector(`[data-area="${previousArea.id}"]`);
          portal.focus({ preventScroll: true });
          portal.scrollIntoView({ behavior: 'instant', block: 'nearest' });
        } else {
          focusHeading('#home-heading');
        }
      }
    }
    previousHash = hash;
  }

  // The skip link keeps the current route and moves focus to its main content.
  document.querySelector('.skip-link').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#inhalt').focus();
  });

  window.addEventListener('hashchange', () => route());
  route(true);
})();
