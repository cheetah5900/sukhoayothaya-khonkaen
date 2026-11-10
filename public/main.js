/**
 * ==============================================================================
 * SUKHO AYOTHAYA THAI MASSAGE ACADEMY - MAIN SCRIPT & CONVERSION SUITE
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. META PIXEL & GTM TRACKING HELPER
  // --------------------------------------------------------------------------
  function fireTrackingEvent(eventName, params = {}) {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, params);
      console.log(`[Meta Pixel Event]: ${eventName}`, params);
    }

    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'meta_pixel_' + eventName.toLowerCase(),
        event_name: eventName,
        ...params
      });
    }
  }

  // LINE Buttons Tracking (Lead)
  document.querySelectorAll('.track-line, a[href*="line.me"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const courseName = this.getAttribute('data-course') || 'General_Inquiry';
      fireTrackingEvent('Lead', {
        content_name: 'LINE_Consultation_Click',
        course_interest: courseName,
        value: 1,
        currency: 'THB'
      });
    });
  });

  // Phone Call Tracking (Contact)
  document.querySelectorAll('.track-phone, a[href^="tel:"]').forEach(btn => {
    btn.addEventListener('click', function () {
      fireTrackingEvent('Contact', {
        content_name: 'Phone_Call_Click',
        phone_target: '0643149999_KruNuch'
      });
    });
  });

  // Facebook Button Tracking (Contact)
  document.querySelectorAll('.track-fb, a[href*="facebook.com"]').forEach(btn => {
    btn.addEventListener('click', function () {
      fireTrackingEvent('Contact', {
        content_name: 'Facebook_Page_Click',
        channel: 'Facebook_Messenger'
      });
    });
  });

  // Course Enrollment Click Tracking (InitiateCheckout)
  document.querySelectorAll('.btn-sig-enroll, .c-link, .btn-card-action, .btn-hero-primary').forEach(btn => {
    btn.addEventListener('click', function () {
      const courseName = this.getAttribute('data-course');
      if (courseName) {
        fireTrackingEvent('InitiateCheckout', {
          content_name: courseName,
          currency: 'THB'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. MOBILE MENU DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. CONCISE FAQ ACCORDION
  // --------------------------------------------------------------------------
  const faqBoxes = document.querySelectorAll('.faq-box');

  faqBoxes.forEach(box => {
    const toggleBtn = box.querySelector('.faq-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const isActive = box.classList.contains('active');

        // Close others for single-focus reading
        faqBoxes.forEach(other => {
          if (other !== box) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-toggle-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          box.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          box.classList.add('active');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 4. SMOOTH SCROLL WITH HEADER OFFSET (FOR HASH LINKS)
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = document.getElementById('siteHeader')?.offsetHeight || 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset - 10;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. IMAGE LIGHTBOX (CLICK TO ENLARGE)
  // --------------------------------------------------------------------------
  const lightboxModal = document.createElement('div');
  lightboxModal.className = 'image-lightbox-modal';
  lightboxModal.id = 'imageLightbox';
  lightboxModal.setAttribute('role', 'dialog');
  lightboxModal.setAttribute('aria-label', 'ดูรูปภาพขนาดใหญ่');
  lightboxModal.innerHTML = `
    <div class="lightbox-content-wrap">
      <button class="lightbox-close-btn" aria-label="ปิดรูปภาพ">&times;</button>
      <img class="lightbox-img" src="" alt="ภาพขยาย" />
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightboxModal);

  const lightboxImg = lightboxModal.querySelector('.lightbox-img');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
  const lightboxClose = lightboxModal.querySelector('.lightbox-close-btn');

  function openLightbox(src, alt) {
    if (!src) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = alt || '';
    lightboxModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', function (e) {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // Attach to course cards, poster images, gallery images, teacher photos, course atmosphere images & map graphic
  document.querySelectorAll('.course-thumb-holder, .course-card-img, .sig-poster-wrap img, .article-gallery-item img, .article-content-body > img, .mosaic-item img, .teacher-img, .atmosphere-img, .map-graphic-img').forEach(el => {
    el.addEventListener('click', function (e) {
      if (this.closest('.gallery-video-link, .is-video-card, #atmosphere-courses-grid, .course-stories-section')) {
        return; // Allow native link click to open article / YouTube
      }
      var parentAnchor = this.tagName.toLowerCase() === 'a' ? this : this.closest('a');
      if (parentAnchor && parentAnchor.getAttribute('href') && !parentAnchor.classList.contains('lightbox-link')) {
        return; // Allow link navigation instead of lightbox
      }
      const img = this.tagName.toLowerCase() === 'img' ? this : this.querySelector('img');
      if (img) {
        e.preventDefault();
        openLightbox(img.currentSrc || img.src, img.alt);
      }
    });
  });

  // --------------------------------------------------------------------------
  // Auto-detect and classify Article Images (Portrait vs Landscape)
  // --------------------------------------------------------------------------
  document.querySelectorAll('.article-gallery-item img, .article-content-body img, .article-featured-img').forEach(function (img) {
    function classifyImage() {
      if (img.naturalWidth && img.naturalHeight) {
        var isPortrait = img.naturalHeight > img.naturalWidth;
        var orientClass = isPortrait ? 'is-portrait' : 'is-landscape';
        img.classList.remove('is-portrait', 'is-landscape');
        img.classList.add(orientClass);
        var parent = img.closest('.article-gallery-item, .article-featured-wrap, figure');
        if (parent) {
          parent.classList.remove('is-portrait', 'is-landscape');
          parent.classList.add(orientClass);
        }
      }
    }
    if (img.complete && img.naturalWidth) {
      classifyImage();
    } else {
      img.addEventListener('load', classifyImage);
    }
  });

  // --------------------------------------------------------------------------
  // 6. STANDARDS 3-TILES TAB SWITCHER
  // --------------------------------------------------------------------------
  const standardTiles = document.querySelectorAll('.standards-tab-tile');
  const standardPanes = document.querySelectorAll('.standards-tab-pane');

  if (standardTiles.length > 0 && standardPanes.length > 0) {
    standardTiles.forEach(tile => {
      tile.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');

        // Set active tile
        standardTiles.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        // Set active pane
        standardPanes.forEach(pane => {
          if (pane.id === `pane-${targetTab}`) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. HERO DESCRIPTION MOBILE COLLAPSE TOGGLE
  // --------------------------------------------------------------------------
  const heroDescBtn = document.querySelector('.btn-hero-desc-toggle');
  const heroDescBody = document.querySelector('.hero-desc-collapse-body');

  if (heroDescBtn && heroDescBody) {
    heroDescBtn.addEventListener('click', function () {
      const isOpen = heroDescBody.classList.contains('is-open');
      const label = this.querySelector('span:first-child');
      if (isOpen) {
        heroDescBody.classList.remove('is-open');
        this.classList.remove('is-active');
        this.setAttribute('aria-expanded', 'false');
        if (label) label.textContent = 'อ่านรายละเอียดสถาบัน';
      } else {
        heroDescBody.classList.add('is-open');
        this.classList.add('is-active');
        this.setAttribute('aria-expanded', 'true');
        if (label) label.textContent = 'ซ่อนรายละเอียด';
      }
    });
  }

  // --------------------------------------------------------------------------
  // PHOTO SLIDESHOW WITH THUMBNAILS (news / activity galleries)
  // Each .article-gallery-grid with 2+ items becomes a main photo + thumbnail
  // strip. The original <img>/<a> nodes are moved (not copied), so the
  // lightbox and YouTube links keep working. Without JS the grid stays.
  // --------------------------------------------------------------------------
  (function () {
    var EN = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var T = EN
      ? { prev: 'Previous photo', next: 'Next photo', show: 'Show photo ' }
      : { prev: 'รูปก่อนหน้า', next: 'รูปถัดไป', show: 'ดูรูปที่ ' };

    document.querySelectorAll('.article-gallery-grid').forEach(function (grid) {
      var figures = Array.prototype.slice.call(grid.querySelectorAll('.article-gallery-item'));
      if (figures.length < 2) return;

      var items = figures.map(function (fig) {
        var media = fig.querySelector('.gallery-video-link') || fig.querySelector('img');
        var img = fig.querySelector('img');
        var cap = fig.querySelector('.article-gallery-caption');
        return {
          media: media,
          thumb: img ? img.getAttribute('src') : '',
          video: !!fig.querySelector('.gallery-video-link'),
          caption: cap ? cap.textContent.trim() : (img ? img.getAttribute('alt') || '' : '')
        };
      });

      var slider = document.createElement('div');
      slider.className = 'pslider';
      slider.setAttribute('tabindex', '0');
      slider.setAttribute('aria-roledescription', 'carousel');

      var stage = document.createElement('div');
      stage.className = 'pslider-stage';
      var track = document.createElement('div');
      track.className = 'pslider-track';
      items.forEach(function (it, i) {
        var slide = document.createElement('div');
        slide.className = 'pslider-slide' + (it.video ? ' is-video' : '');
        slide.setAttribute('aria-label', (i + 1) + ' / ' + items.length);
        if (it.media) {
          var img = it.media.tagName === 'IMG' ? it.media : it.media.querySelector('img');
          if (img) {
            img.removeAttribute('width');
            img.removeAttribute('height');
            if (i > 0) img.loading = 'lazy';
          }
          slide.appendChild(it.media);
        }
        track.appendChild(slide);
      });
      stage.appendChild(track);

      function arrow(dir, label, path) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pslider-arrow pslider-' + dir;
        b.setAttribute('aria-label', label);
        b.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="' + path + '" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        stage.appendChild(b);
        return b;
      }
      var prev = arrow('prev', T.prev, 'M15 5l-7 7 7 7');
      var next = arrow('next', T.next, 'M9 5l7 7-7 7');
      var counter = document.createElement('div');
      counter.className = 'pslider-counter';
      stage.appendChild(counter);

      var caption = document.createElement('p');
      caption.className = 'pslider-caption';

      var thumbs = document.createElement('div');
      thumbs.className = 'pslider-thumbs';
      var thumbBtns = items.map(function (it, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pslider-thumb' + (it.video ? ' is-video' : '');
        b.setAttribute('aria-label', T.show + (i + 1) + ': ' + it.caption);
        var img = document.createElement('img');
        img.src = it.thumb; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
        b.appendChild(img);
        b.addEventListener('click', function () { go(i); });
        thumbs.appendChild(b);
        return b;
      });

      slider.appendChild(stage);
      slider.appendChild(caption);
      slider.appendChild(thumbs);
      grid.replaceWith(slider);

      var current = -1;
      function setActive(i) {
        if (i === current) return;
        current = i;
        counter.textContent = (i + 1) + ' / ' + items.length;
        caption.textContent = items[i].caption;
        prev.disabled = i === 0;
        next.disabled = i === items.length - 1;
        thumbBtns.forEach(function (b, j) {
          b.classList.toggle('is-active', j === i);
          if (j === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
        });
        var t = thumbBtns[i];
        var left = t.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2;
        thumbs.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
      }
      function go(i) {
        i = Math.max(0, Math.min(items.length - 1, i));
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
        setActive(i);
      }
      prev.addEventListener('click', function () { go(current - 1); });
      next.addEventListener('click', function () { go(current + 1); });
      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
      });
      var scrollTimer;
      track.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          setActive(Math.round(track.scrollLeft / track.clientWidth));
        }, 80);
      }, { passive: true });
      window.addEventListener('resize', function () {
        track.scrollLeft = current * track.clientWidth;
      });
      setActive(0);
    });
  })();

});
