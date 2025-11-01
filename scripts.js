// Small script to add "in-view" reveal on scroll and enable subtle interactions.
// Also ensures CTA buttons are functional (they are just normal links) and adds keyboard accessibility.

(function () {
  'use strict';

  // Reveal on scroll via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Make gallery items keyboard-focusable and support "Enter" to open the image in a new tab
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const img = item.querySelector('img');
        if (img && img.src) {
          window.open(img.src, '_blank', 'noopener');
        }
      }
    });

    // Show a subtle elevation on touchstart for mobile users
    item.addEventListener('touchstart', () => {
      item.style.transform = 'translateY(-4px)';
      setTimeout(()=> item.style.transform = '', 200);
    });
  });

  // Smooth internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Slight microinteraction: focus states for pricing cards
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const btn = card.querySelector('.btn');
        if (btn) btn.click();
      }
    });
  });

  // This file keeps things minimal and uses CSS for most animations.
})();