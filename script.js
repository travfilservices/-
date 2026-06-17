/* ══════════════════════════════════════════════════
   TRAVFIL TRAVEL SERVICES — script.js
   Fully checked interactions, accessible controls, and fixed carousel
══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── HELPERS ──
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function setExpanded(element, expanded) {
    if (element) element.setAttribute('aria-expanded', String(expanded));
  }

  function setHidden(element, hidden) {
    if (element) element.setAttribute('aria-hidden', String(hidden));
  }

  function initTravfilWebsite() {
    initWhyChooseDropdown();
    initServicesCarousel();
    initPackageVideoBanners();
    initTabs();
    initMobileNavigation();
    initPackageInquiryButtons();
    initContactForm();
    initSmoothScroll();
    initNavbarShadow();

    console.info('Travfil Travel Services website loaded successfully.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTravfilWebsite);
  } else {
    initTravfilWebsite();
  }

  // ── WHY CHOOSE US DROPDOWN ──
  function initWhyChooseDropdown() {
    const whyChooseBtn = $('#whyChooseBtn');
    const whyChooseDropdown = $('#whyChooseDropdown');

    if (!whyChooseBtn || !whyChooseDropdown) return;

    function closeWhyChooseDropdown() {
      whyChooseDropdown.classList.remove('active');
      setHidden(whyChooseDropdown, true);
      setExpanded(whyChooseBtn, false);
    }

    function toggleWhyChooseDropdown(event) {
      event.stopPropagation();
      const willOpen = !whyChooseDropdown.classList.contains('active');
      whyChooseDropdown.classList.toggle('active', willOpen);
      setHidden(whyChooseDropdown, !willOpen);
      setExpanded(whyChooseBtn, willOpen);
    }

    whyChooseBtn.addEventListener('click', toggleWhyChooseDropdown);

    document.addEventListener('click', function (event) {
      if (!whyChooseBtn.contains(event.target) && !whyChooseDropdown.contains(event.target)) {
        closeWhyChooseDropdown();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeWhyChooseDropdown();
    });
  }

  // ── SERVICES AUTO-SCROLL CAROUSEL ──
  function initServicesCarousel() {
    const servicesCarousel = $('[data-services-carousel]');
    if (!servicesCarousel) return;

    const servicesTrack = $('.services-track', servicesCarousel);
    if (!servicesTrack) return;

    let hoverPaused = false;
    let loopWidth = 0;
    let rafId = null;
    let lastFrameTime = null;
    const speedPixelsPerSecond = 42;

    function originalCards() {
      return $$('.service-card:not(.service-card-clone)', servicesTrack);
    }

    function cloneServiceCardsForSeamlessLoop() {
      if (servicesTrack.dataset.cloned === 'true') return;

      originalCards().forEach(function (card) {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('service-card-clone');
        servicesTrack.appendChild(clone);
      });

      servicesTrack.dataset.cloned = 'true';
    }

    function measureLoopWidth() {
      const firstOriginal = $('.service-card:not(.service-card-clone)', servicesTrack);
      const firstClone = $('.service-card-clone', servicesTrack);

      if (firstOriginal && firstClone) {
        loopWidth = Math.max(0, firstClone.offsetLeft - firstOriginal.offsetLeft);
      } else {
        loopWidth = Math.max(0, servicesTrack.scrollWidth - servicesCarousel.clientWidth);
      }

      normalizeScrollPosition();
      updateAutoPlayState();
    }

    function normalizeScrollPosition() {
      if (!loopWidth) return;

      while (servicesCarousel.scrollLeft >= loopWidth) {
        servicesCarousel.scrollLeft -= loopWidth;
      }

      while (servicesCarousel.scrollLeft < 0) {
        servicesCarousel.scrollLeft += loopWidth;
      }
    }

    function canAutoPlay() {
      return !hoverPaused && !document.hidden && loopWidth > servicesCarousel.clientWidth;
    }

    function updateAutoPlayState() {
      servicesCarousel.classList.toggle('is-auto-playing', canAutoPlay());
    }

    function animateServicesCarousel(frameTime) {
      if (lastFrameTime === null) lastFrameTime = frameTime;
      const elapsed = Math.min(80, frameTime - lastFrameTime);
      lastFrameTime = frameTime;

      if (canAutoPlay()) {
        servicesCarousel.scrollLeft += (speedPixelsPerSecond * elapsed) / 1000;
        normalizeScrollPosition();
      }

      rafId = window.requestAnimationFrame(animateServicesCarousel);
    }

    cloneServiceCardsForSeamlessLoop();
    measureLoopWidth();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureLoopWidth).catch(function () {});
    }

    window.addEventListener('load', measureLoopWidth);
    window.addEventListener('resize', function () {
      window.clearTimeout(initServicesCarousel.resizeTimer);
      initServicesCarousel.resizeTimer = window.setTimeout(measureLoopWidth, 120);
    });

    servicesTrack.addEventListener('mouseover', function (event) {
      if (event.target.closest('.service-card')) {
        hoverPaused = true;
        updateAutoPlayState();
      }
    });

    servicesTrack.addEventListener('mouseout', function (event) {
      const nextTarget = event.relatedTarget;
      if (!nextTarget || !servicesTrack.contains(nextTarget) || !nextTarget.closest('.service-card')) {
        hoverPaused = false;
        updateAutoPlayState();
      }
    });

    document.addEventListener('visibilitychange', updateAutoPlayState);

    if (!rafId) {
      rafId = window.requestAnimationFrame(animateServicesCarousel);
    }
  }

  // ── PACKAGE VIDEO BANNERS ──
  function initPackageVideoBanners() {
    const packageVideoBanners = $$('[data-video-banner]');
    if (!packageVideoBanners.length) return;

    function stopAllPackageVideos(exceptBanner = null) {
      packageVideoBanners.forEach(function (banner) {
        if (banner === exceptBanner) return;
        const video = $('video', banner);
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        banner.classList.remove('playing');
      });
    }

    packageVideoBanners.forEach(function (banner) {
      const video = $('video', banner);
      const playButton = $('.pkg-video-play', banner);

      if (!video || !playButton) return;

      banner.addEventListener('click', function (event) {
        event.stopPropagation();
      });

      playButton.addEventListener('click', async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!video.paused) {
          video.pause();
          banner.classList.remove('playing');
          return;
        }

        stopAllPackageVideos(banner);
        banner.classList.add('playing');

        try {
          await video.play();
        } catch (error) {
          banner.classList.remove('playing');
          console.warn('Video playback was blocked by the browser.', error);
        }
      });

      video.addEventListener('click', function (event) {
        event.stopPropagation();
        if (video.paused) {
          playButton.click();
        } else {
          video.pause();
          banner.classList.remove('playing');
        }
      });

      video.addEventListener('pause', function () {
        banner.classList.remove('playing');
      });

      video.addEventListener('ended', function () {
        banner.classList.remove('playing');
        video.currentTime = 0;
      });
    });

    document.addEventListener('click', function () {
      stopAllPackageVideos();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') stopAllPackageVideos();
    });
  }

  // ── TAB FUNCTIONALITY ──
  function initTabs() {
    const tabButtons = $$('.tab-btn');
    const tabPanels = $$('.tab-content');
    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(function (button) {
      const tabName = button.getAttribute('data-tab');
      const panel = tabName ? $(`#tab-${tabName}`) : null;
      if (panel) {
        if (!button.id) button.id = `tab-button-${tabName}`;
        button.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', button.id);
      }
    });

    function activateTab(button, moveFocus = false) {
      const tabName = button.getAttribute('data-tab');
      const targetTab = tabName ? $(`#tab-${tabName}`) : null;
      if (!targetTab) return;

      tabButtons.forEach(function (btn) {
        const active = btn === button;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
        btn.setAttribute('tabindex', active ? '0' : '-1');
      });

      tabPanels.forEach(function (content) {
        const active = content === targetTab;
        content.classList.toggle('active', active);
        content.toggleAttribute('hidden', !active);
      });

      if (moveFocus) button.focus();
    }

    tabButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activateTab(button);
      });

      button.addEventListener('keydown', function (event) {
        const currentIndex = tabButtons.indexOf(button);
        let nextIndex = currentIndex;

        if (event.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % tabButtons.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabButtons.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activateTab(tabButtons[nextIndex], true);
      });
    });

    const initiallyActive = $('.tab-btn.active') || tabButtons[0];
    activateTab(initiallyActive);
  }

  // ── HAMBURGER MENU ──
  function initMobileNavigation() {
    const hamburger = $('#hamburger');
    const navLinks = $('#nav-links');
    if (!hamburger || !navLinks) return;

    function closeMobileMenu() {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      setExpanded(hamburger, false);
    }

    hamburger.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = navLinks.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      setExpanded(hamburger, isOpen);
    });

    $$('#nav-links a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', function (event) {
      if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) closeMobileMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMobileMenu();
    });
  }

  // ── PACKAGE BUTTONS PRE-FILL CONTACT INQUIRY ──
  function initPackageInquiryButtons() {
    function selectServiceOption(serviceSelect, selectedPackage) {
      if (!serviceSelect || !selectedPackage) return;

      const matchingOption = Array.from(serviceSelect.options).find(function (option) {
        return option.text.trim() === selectedPackage.trim() || option.value.trim() === selectedPackage.trim();
      });

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }

      serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    $$('.package-cta').forEach(function (button) {
      button.addEventListener('click', function () {
        const card = button.closest('.pkg-card');
        const packageTitle = card ? $('.pkg-header h3', card)?.textContent.trim() : 'selected package';
        const selectedPackage = button.dataset.package || packageTitle;
        const serviceSelect = $('#service');
        const messageField = $('#message');

        selectServiceOption(serviceSelect, selectedPackage);

        if (messageField && selectedPackage) {
          messageField.value = `Hi Travfil, I would like to inquire/book the ${selectedPackage}. Please send me the full details, available dates, inclusions, and requirements. Thank you.`;
          messageField.dataset.autoPackageMessage = messageField.value;
        }
      });
    });
  }

  // ── CONTACT FORM ──
  function initContactForm() {
    const contactForm = $('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
      const formData = new FormData(contactForm);
      const requiredFields = [
        formData.get('email'),
        formData.get('First Name'),
        formData.get('Last Name'),
        formData.get('Contact Number'),
        formData.get('Service Interested In'),
        formData.get('Message')
      ];

      if (requiredFields.some(function (value) { return !String(value || '').trim(); })) {
        event.preventDefault();
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      const email = String(formData.get('email')).trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        event.preventDefault();
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      showFormMessage('Submitting your inquiry...', 'success');
    });
  }

  function showFormMessage(message, type) {
    const formMsg = $('#form-msg');
    if (!formMsg) return;

    formMsg.textContent = message;
    formMsg.className = `form-msg ${type}`;

    window.clearTimeout(showFormMessage.timeoutId);
    showFormMessage.timeoutId = window.setTimeout(function () {
      formMsg.textContent = '';
      formMsg.className = 'form-msg';
    }, 5000);
  }

  // ── SMOOTH SCROLL ──
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = $(href);
        if (!target) return;

        event.preventDefault();
        const navbarHeight = $('#navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ── NAVBAR BACKGROUND ON SCROLL ──
  function initNavbarShadow() {
    const navbar = $('#navbar');
    if (!navbar) return;

    function updateNavbarShadow() {
      navbar.style.boxShadow = window.scrollY > 50
        ? '0 4px 20px rgba(27, 42, 94, 0.1)'
        : '0 2px 12px rgba(27, 42, 94, 0.07)';
    }

    updateNavbarShadow();
    window.addEventListener('scroll', updateNavbarShadow, { passive: true });
  }
}());
