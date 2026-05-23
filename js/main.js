/* =============================================
   Heiz- und Haustechnik Aydin GmbH
   main.js — Burger Menu, Scroll Reveal,
             Header Scroll, Contact Form, Year
   ============================================= */

(function () {
  'use strict';

  /* ----- Header: add .scrolled class on scroll ----- */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ----- Burger Menu ----- */
  const burger  = document.getElementById('burger');
  const navList = document.getElementById('nav-list');

  if (burger && navList) {
    burger.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen.toString());
      // No scroll-lock — nav is position:fixed, no lock needed
    });

    // Close menu on nav link click
    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click / touch
    document.addEventListener('click', function (e) {
      if (
        navList.classList.contains('open') &&
        !navList.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        navList.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----- Scroll Reveal (IntersectionObserver) ----- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el, i) {
      // Stagger delay: every 3 siblings get slight delay
      el.style.transitionDelay = (i % 3) * 0.1 + 's';
      revealObs.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ----- Contact Form (frontend validation + success message) ----- */
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = form.elements['name'].value.trim();
      const email   = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      const privacy = form.elements['privacy'].checked;

      // Simple validation
      if (!name || !email || !message || !privacy) {
        formStatus.textContent = 'Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie der Datenschutzerklärung zu.';
        formStatus.className = 'form__status error';
        return;
      }

      // Basic email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        formStatus.className = 'form__status error';
        return;
      }

      // Simulate send (no backend in this static version)
      formStatus.textContent = 'Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns schnellstmöglich.';
      formStatus.className = 'form__status success';
      form.reset();
    });
  }

  /* ----- Dynamic year in footer ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
