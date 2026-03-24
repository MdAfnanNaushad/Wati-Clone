

(function () {
  'use strict';

  var header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* =====================================================
     2. MOBILE HAMBURGER NAV
     ===================================================== */
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu') || document.querySelector('.nav__menu');

 
  if (hamburger && navMenu) {
    function openMenu() {
      navMenu.classList.add('nav__menu--open');
      hamburger.classList.add('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navMenu.classList.remove('nav__menu--open');
      hamburger.classList.remove('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (navMenu.classList.contains('nav__menu--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

   
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('nav__menu--open') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });


    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Auto-close on desktop resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && navMenu.classList.contains('nav__menu--open')) {
        closeMenu();
      }
    });
  }


  var dropdownItems = navMenu ? navMenu.querySelectorAll('.nav__item--dropdown') : [];

  if (dropdownItems.length > 0) {
    dropdownItems.forEach(function (item) {
      var trigger = item.querySelector('.nav__link');

      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        // Only intercept on mobile widths
        if (window.innerWidth > 768) return;

        e.preventDefault();
        var isOpen = item.classList.contains('nav__item--dropdown-open');

       
        dropdownItems.forEach(function (other) {
          other.classList.remove('nav__item--dropdown-open');
          var btn = other.querySelector('.nav__link');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('nav__item--dropdown-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }


  /* =====================================================
     4. PRICING TOGGLE — monthly ↔ annual
     ===================================================== */
  var billingToggle = document.getElementById('billingToggle');
  var priceEls = document.querySelectorAll('.pricing__amount[data-monthly]');

  if (billingToggle) {
    billingToggle.addEventListener('change', function () {
      var isAnnual = this.checked;

      priceEls.forEach(function (el) {
        var monthly = el.getAttribute('data-monthly');
        var annual = el.getAttribute('data-annual');
        var newVal = isAnnual ? annual : monthly;

        // Flip animation
        el.style.transition = 'none';
        el.style.transform = 'translateY(-8px)';
        el.style.opacity = '0';

        setTimeout(function () {
          el.textContent = newVal;
          el.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        }, 120);
      });
    });
  }


  /* =====================================================
     5. SCROLL-TRIGGERED REVEAL
        Uses IntersectionObserver to stagger card reveals
     ===================================================== */
  var revealSelectors = [
    '.features__card',
    '.testimonials__card',
    '.pricing__card',
    '.how-it-works__step',
    '.stats__item',
  ].join(', ');

  var revealTargets = document.querySelectorAll(revealSelectors);

  // Add base class before observing
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          
          var siblings = Array.from(entry.target.parentElement.children);
          var idx = siblings.indexOf(entry.target);
          var delay = Math.min(idx * 80, 400); // cap at 400ms

          setTimeout(function () {
            entry.target.classList.add('reveal--visible');
          }, delay);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback — show all immediately for old browsers
    revealTargets.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }


  /* =====================================================
     6. SMOOTH ANCHOR SCROLL
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      if (!id) return;

      var target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      closeMenu(); // close mobile nav if open

      var offset = header.offsetHeight + 8;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* =====================================================
     7. ACTIVE NAV SECTION HIGHLIGHT on scroll
     ===================================================== */
  var sections = document.querySelectorAll('section[id]');
  var navCTALink = document.querySelector('.nav__cta-link');

  // Inject active link style once
  var activeStyle = document.createElement('style');
  activeStyle.textContent = [
    '.nav__link--active {',
    '  color: var(--color-black) !important;',
    '  background: var(--color-gray-100) !important;',
    '}',
    '.nav__cta-link--active {',
    '  color: var(--color-black) !important;',
    '  font-weight: 700 !important;',
    '}',
  ].join('');
  document.head.appendChild(activeStyle);

  function highlightActiveSection() {
    var scrollY = window.scrollY + header.offsetHeight + 60;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        var id = section.id;
        var matching = document.querySelector('.nav__cta-link[href="#' + id + '"]');
        if (navCTALink) navCTALink.classList.remove('nav__cta-link--active');
        if (matching) matching.classList.add('nav__cta-link--active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection, { passive: true });


  var highlightWords = [
    { line1: 'business', line2: 'messaging' },
    { line1: 'marketing', line2: 'automation' },
    { line1: 'sales', line2: 'conversion' },
    { line1: 'support', line2: 'retention' },
  ];

  var highlights = document.querySelectorAll('.hero__highlight');
  var currentWordIdx = 0;
  var wordInterval;

  function cycleHighlightWords() {
    currentWordIdx = (currentWordIdx + 1) % highlightWords.length;
    var words = highlightWords[currentWordIdx];

    highlights.forEach(function (el, i) {
      // Animate out
      el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';

      setTimeout(function () {
        el.textContent = i === 0 ? words.line1 : words.line2;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 220);
    });
  }

  // Only auto-cycle if user hasn't scrolled past hero
  function startWordCycle() {
    wordInterval = setInterval(cycleHighlightWords, 3200);
  }

  function stopWordCycle() {
    clearInterval(wordInterval);
  }

  // Start cycle after initial animations complete
  setTimeout(startWordCycle, 2000);

  // Stop when user scrolls past hero
  var heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    var heroObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        startWordCycle();
      } else {
        stopWordCycle();
      }
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);
  }


  /* =====================================================
     8b. PRICING TOGGLE — Annual / Monthly
     ===================================================== */
  var prcAnnual = document.getElementById('prcAnnual');
  var prcMonthly = document.getElementById('prcMonthly');
  var prcAmounts = document.querySelectorAll('.prc__amount');
  var prcBilled = document.querySelectorAll('.prc__billed');

  function switchPricing(plan) {
    prcAmounts.forEach(function (el) {
      var val = el.getAttribute('data-' + plan);
      if (!val) return;
      // Flip animation
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(function () {
        el.textContent = Number(val).toLocaleString('en-IN');
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 120);
    });
    prcBilled.forEach(function (el) {
      el.textContent = plan === 'annual' ? 'billed annually' : 'billed monthly';
    });
    // Toggle pill active state
    prcAnnual.classList.toggle('prc__pill--active', plan === 'annual');
    prcMonthly.classList.toggle('prc__pill--active', plan === 'monthly');
  }

  if (prcAnnual && prcMonthly) {
    prcAnnual.addEventListener('click', function () { switchPricing('annual'); });
    prcMonthly.addEventListener('click', function () { switchPricing('monthly'); });
  }

  /* =====================================================
     8b. CASE STUDIES CAROUSEL
     ===================================================== */
  var casesTrack = document.getElementById('casesTrack');
  var casesPrev = document.getElementById('casesPrev');
  var casesNext = document.getElementById('casesNext');
  var casesSection = document.querySelector('.cases');

  if (casesTrack && casesPrev && casesNext) {
    var casesIndex = 0;
    var casesCards = casesTrack.querySelectorAll('.cases__card');
    var casesTotal = casesCards.length;
    var casesVisible = 1; // show 1 card at a time on the track

    function updateCasesCarousel() {
      var cardW = casesCards[0] ? casesCards[0].offsetWidth + 20 : 0;
      casesTrack.style.transform = 'translateX(-' + (casesIndex * cardW) + 'px)';
      casesPrev.disabled = casesIndex === 0;
      casesNext.disabled = casesIndex >= casesTotal - 2;
    }

    casesPrev.addEventListener('click', function () {
      if (casesIndex > 0) { casesIndex--; updateCasesCarousel(); }
    });

    casesNext.addEventListener('click', function () {
      if (casesIndex < casesTotal - 2) { casesIndex++; updateCasesCarousel(); }
    });

    // Touch/drag support
    var dragStartX = 0;
    var dragging = false;

    casesTrack.addEventListener('mousedown', function (e) { dragging = true; dragStartX = e.clientX; });
    casesTrack.addEventListener('mousemove', function (e) { if (!dragging) return; e.preventDefault(); });
    casesTrack.addEventListener('mouseup', function (e) {
      if (!dragging) return;
      dragging = false;
      var diff = dragStartX - e.clientX;
      if (diff > 60 && casesIndex < casesTotal - 2) { casesIndex++; updateCasesCarousel(); }
      if (diff < -60 && casesIndex > 0) { casesIndex--; updateCasesCarousel(); }
    });
    casesTrack.addEventListener('mouseleave', function () { dragging = false; });

    window.addEventListener('resize', function () { updateCasesCarousel(); });
    updateCasesCarousel();
  }

  /* Scroll-reveal for case study cards */
  if (casesSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        casesSection.classList.add('cases--visible');
      }
    }, { threshold: 0.1 }).observe(casesSection);
  } else if (casesSection) {
    casesSection.classList.add('cases--visible');
  }

  /* Awards section scroll-reveal */
  var awrdSection = document.querySelector('.awrd');
  if (awrdSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        awrdSection.classList.add('awrd--visible');
      }
    }, { threshold: 0.15 }).observe(awrdSection);
  } else if (awrdSection) {
    awrdSection.classList.add('awrd--visible');
  }

  /* =====================================================
     8c. GLOBAL LEADERS — number count-up animation
     ===================================================== */
  var gldrSection = document.querySelector('.gldr');

  if (gldrSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      // Animate stat values
      var statVals = gldrSection.querySelectorAll('.gldr__stat-val');
      statVals.forEach(function (el) {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 200);
      });
    }, { threshold: 0.3 }).observe(gldrSection);
  }


  var intgSection = document.querySelector('.intg');

  if (intgSection && 'IntersectionObserver' in window) {
    var intgObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        intgSection.classList.add('intg--visible');
        intgObs.unobserve(intgSection);
      }
    }, { threshold: 0.15 });
    intgObs.observe(intgSection);
  } else if (intgSection) {
    intgSection.classList.add('intg--visible');
  }


  var aiCards = document.querySelectorAll('.wati-ai__card');

  if ('IntersectionObserver' in window && aiCards.length) {
    var aiObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Small stagger between card 1 and card 2
        var card = entry.target;
        var delay = card.classList.contains('wati-ai__card--blue') ? 150 : 0;
        setTimeout(function () {
          card.classList.add('wati-ai__card--visible');
        }, delay);
        aiObserver.unobserve(card);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    aiCards.forEach(function (card) {
      aiObserver.observe(card);
    });
  } else {
    // Fallback
    aiCards.forEach(function (c) { c.classList.add('wati-ai__card--visible'); });
  }


  var journeyTabs = document.querySelectorAll('.journey__tab');
  var journeyPanels = document.querySelectorAll('.journey__panel');

  journeyTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');

      // Update tab states
      journeyTabs.forEach(function (t) {
        t.classList.remove('journey__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('journey__tab--active');
      this.setAttribute('aria-selected', 'true');

      // Switch panels — remove active first, then re-add on next frame
      // This forces CSS animations to retrigger cleanly
      journeyPanels.forEach(function (p) {
        p.classList.remove('journey__panel--active');
      });

      var activePanel = document.querySelector('.journey__panel[data-panel="' + target + '"]');
      if (activePanel) {
        // Small rAF delay so browser registers the class removal before re-adding
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            activePanel.classList.add('journey__panel--active');
          });
        });
      }
    });
  });


  
  setTimeout(function () {
    var unrevealed = document.querySelectorAll('.wati-ai__card:not(.wati-ai__card--visible)');
    unrevealed.forEach(function (card) {
      card.classList.add('wati-ai__card--visible');
    });
  }, 1000);

  // Guarantee cases section displays
  setTimeout(function () {
    var casesSection = document.querySelector('.cases');
    if (casesSection && !casesSection.classList.contains('cases--visible')) {
      casesSection.classList.add('cases--visible');
    }
  }, 1200);

  // Guarantee awards section displays
  setTimeout(function () {
    var awrdSection = document.querySelector('.awrd');
    if (awrdSection && !awrdSection.classList.contains('awrd--visible')) {
      awrdSection.classList.add('awrd--visible');
    }
  }, 1400);

  // Guarantee integrations section displays
  setTimeout(function () {
    var intgSection = document.querySelector('.intg');
    if (intgSection && !intgSection.classList.contains('intg--visible')) {
      intgSection.classList.add('intg--visible');
    }
  }, 1600);

  console.log(
    '%cWati Clone ✅  |  BEM + Vanilla JS  |  No frameworks',
    'color:#00e676; font-weight:bold; font-size:13px; background:#1a1a1a; padding:6px 12px; border-radius:6px;'
  );

})();