// ============================================================
// 🚀 HUMAIRA ESHIKA - Main JavaScript File
// ============================================================
// Description: All site functionality including sliders, 
// gallery, dropdowns, cursor effects, and animations
// ============================================================

(function ($) {
  'use strict';

  // ============================================================
  // 📋 TABLE OF CONTENTS
  // ============================================================
  // 1.  Slider Initialization
  // 2.  Gallery Lightbox
  // 3.  Custom Cursor
  // 4.  Smooth Scroll
  // 5.  Scroll Indicator
  // 6.  Navbar Active Link
  // 7.  Preloader
  // 8.  AOS Animation
  // 9.  Mobile Menu
  // 10. Image Lazy Loading
  // 11. Dropdown System
  // 12. Console Log
  // ============================================================

  // ============================================================
  // 1. 🎠 SLIDER INITIALIZATION
  // ============================================================

  $(document).ready(function () {
    /**
     * Initialize Slick Carousel for Awards Section
     * Features: Autoplay, Custom arrows, Responsive
     */
    if ($('.slick-slider').length) {
      $('.slick-slider').slick({
        arrows: true,
        dots: false,
        slidesToShow: 3,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        prevArrow: $('.custom-prev'),
        nextArrow: $('.custom-next'),
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });

      // Fix for Slick Slider arrows on resize
      let resizeTimer;
      $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if ($('.slick-slider').hasClass('slick-initialized')) {
            $('.slick-slider').slick('refresh');
          }
        }, 250);
      });
    }
  });

  // ============================================================
  // 2. 🖼️ GALLERY LIGHTBOX
  // ============================================================

  $(document).ready(function () {
    /**
     * Initialize Fancybox for Gallery Images
     * Supports both .gallery-item and .gallery a structures
     */
    const galleryItems = $('.gallery-item, .gallery a');

    if (galleryItems.length) {
      // Setup gallery items
      galleryItems.each(function () {
        const $this = $(this);
        const img = $this.find('img');
        const altText = img.attr('alt') || 'Gallery Image';
        const caption = $this.data('caption') || altText;

        $this.attr({
          'data-fancybox': 'gallery',
          'data-caption': caption,
          'title': caption
        });
      });

      // Initialize Fancybox
      if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox]', {
          Toolbar: {
            display: {
              left: ['infobar'],
              middle: [],
              right: ['zoom', 'thumbs', 'close']
            }
          },
          Image: {
            zoom: true,
            fit: 'contain'
          },
          Thumbs: {
            autoStart: false
          }
        });
      }
    }
  });

  // ============================================================
  // 3. 🖱️ CUSTOM CURSOR
  // ============================================================

  (function () {
    /**
     * Custom cursor with smooth following animation
     * Features: Smooth easing, hover effects, iframe handling
     */
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active');
    });

    // Animate cursor with smooth easing
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn-one, .btn-modern, .nav-link, .stat-card, ' +
      '.social-icons a, .nav-item, .dropdown-hover, [role="button"], .slick-arrow'
    );

    interactiveElements.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
      });
    });

    // Hide cursor on iframes (YouTube, etc.)
    document.querySelectorAll('iframe').forEach(function (iframe) {
      iframe.addEventListener('mouseenter', function () {
        cursor.style.opacity = '0';
      });
      iframe.addEventListener('mouseleave', function () {
        cursor.style.opacity = '1';
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('active');
    });
    document.addEventListener('mouseenter', function () {
      cursor.classList.add('active');
    });

  })();

  // ============================================================
  // 4. 📜 SMOOTH SCROLL
  // ============================================================

  (function () {
    /**
     * Smooth scroll for anchor links
     * Excludes #about and empty anchors
     */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#about') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  })();

  // ============================================================
  // 5. ⬇️ SCROLL INDICATOR
  // ============================================================

  (function () {
    /**
     * Scroll indicator click handler
     * Scrolls down by one viewport height
     */
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      indicator.addEventListener('click', function () {
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      });
    }
  })();

  // ============================================================
  // 6. 🔗 NAVBAR ACTIVE LINK
  // ============================================================

  (function () {
    /**
     * Highlight active navigation link based on current page
     */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.site-vt-menu .nav-link');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  })();

  // ============================================================
  // 7. ⏳ PRELOADER
  // ============================================================

  document.addEventListener('DOMContentLoaded', function () {
    /**
     * Preloader with fade-out animation
     * Hides after 1.5 seconds with smooth transition
     */
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(function () {
          preloader.style.display = 'none';
          document.body.classList.remove('preload-active');
        }, 500);
      }, 1500);
    }
  });

  // ============================================================
  // 8. 🎯 AOS ANIMATION
  // ============================================================

  (function () {
    /**
     * Initialize AOS (Animate On Scroll) library
     */
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }
  })();

  // ============================================================
  // 9. 📱 MOBILE MENU
  // ============================================================

  (function () {
    /**
     * Close mobile offcanvas menu after link click
     */
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      const links = mobileMenu.querySelectorAll('.nav-link');

      links.forEach(function (link) {
        link.addEventListener('click', function () {
          const offcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
          if (offcanvas) {
            offcanvas.hide();
          }
        });
      });
    }
  })();

  // ============================================================
  // 10. 🖼️ IMAGE LAZY LOADING
  // ============================================================

  (function () {
    /**
     * Add lazy loading attribute to all images
     * Improves page load performance
     */
    document.querySelectorAll('img:not([loading])').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
    });
  })();

  // ============================================================
  // 11. 📂 DROPDOWN SYSTEM (Accordion + Hover)
  // ============================================================

  (function () {
    'use strict';

    /**
     * Dropdown system with dual functionality:
     * - Click: Accordion style toggle
     * - Hover: Open on desktop (media query)
     */

    // Initialize dropdowns when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
      initDropdowns();
    }

    /**
     * Main initialization function
     */
    function initDropdowns() {
      setupDropdowns();
      setupMobileDropdowns();

      // Close dropdowns when clicking outside
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown-item-wrapper')) {
          closeAllDropdowns();
        }
      });
    }

    /**
     * Setup main sidebar dropdowns
     */
    function setupDropdowns() {
      const toggles = document.querySelectorAll(
        '.dropdown-toggle-custom:not(#mobileMenu .dropdown-toggle-custom)'
      );

      toggles.forEach(function (toggle) {
        toggle.removeEventListener('click', handleToggleClick);
        toggle.addEventListener('click', handleToggleClick);
      });
    }

    /**
     * Setup mobile offcanvas dropdowns
     */
    function setupMobileDropdowns() {
      const toggles = document.querySelectorAll('#mobileMenu .dropdown-toggle-custom');

      toggles.forEach(function (toggle) {
        toggle.removeEventListener('click', handleToggleClick);
        toggle.addEventListener('click', handleToggleClick);
      });
    }

    /**
     * Handle dropdown toggle click
     */
    function handleToggleClick(e) {
      e.preventDefault();
      e.stopPropagation();

      const toggle = this;
      const targetId = toggle.getAttribute('data-target');

      if (!targetId) {
        console.warn('Dropdown toggle missing data-target attribute');
        return;
      }

      const dropdown = document.getElementById(targetId);
      if (!dropdown) {
        console.warn('Dropdown menu not found:', targetId);
        return;
      }

      const isOpen = dropdown.classList.contains('open');

      // Close all other dropdowns (accordion behavior)
      document.querySelectorAll('.dropdown-menu-custom').forEach(function (menu) {
        if (menu.id !== targetId) {
          menu.classList.remove('open');
          const siblingToggle = document.querySelector('[data-target="' + menu.id + '"]');
          if (siblingToggle) {
            siblingToggle.classList.remove('active');
          }
        }
      });

      // Toggle current dropdown
      if (isOpen) {
        dropdown.classList.remove('open');
        toggle.classList.remove('active');
      } else {
        dropdown.classList.add('open');
        toggle.classList.add('active');
      }
    }

    /**
     * Close all open dropdowns
     */
    function closeAllDropdowns() {
      document.querySelectorAll('.dropdown-menu-custom.open').forEach(function (menu) {
        menu.classList.remove('open');
        const toggle = document.querySelector('[data-target="' + menu.id + '"]');
        if (toggle) {
          toggle.classList.remove('active');
        }
      });
    }

    /**
     * Reinitialize dropdowns after offcanvas opens
     */
    const mobileOffcanvas = document.getElementById('mobileMenu');
    if (mobileOffcanvas) {
      mobileOffcanvas.addEventListener('shown.bs.offcanvas', function () {
        setTimeout(setupMobileDropdowns, 100);
      });
    }

    /**
     * Close dropdowns on window resize
     */
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(closeAllDropdowns, 250);
    });

    // Expose for debugging
    window.dropdownHelpers = {
      closeAll: closeAllDropdowns,
      setup: function () {
        setupDropdowns();
        setupMobileDropdowns();
      }
    };

  })();


  

  // ============================================================
  // 12. ✅ CONSOLE LOG
  // ============================================================

  console.log('✅ All scripts loaded successfully | HUMAIRA ESHIKA Website');

})(jQuery);