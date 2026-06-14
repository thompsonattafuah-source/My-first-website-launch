/* ============================================
   PROFOCUS MEDIA GHANA - MAIN JAVASCRIPT
   
   Teaching Concepts:
   - Event delegation for efficient listeners
   - DOM manipulation best practices
   - Accessibility (ARIA attributes)
   - Performance optimization
   - Error handling
   - Security considerations
============================================ */

/* ============================================
   DOCUMENT READY - INITIALIZATION
   Why: Ensures HTML is fully loaded before running JS
   Security: DOMContentLoaded is safer than onload
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initializeMobileMenu();
  initializeAccordion();
  initializeBookingButtons();
  initializeSmoothScroll();
  initializeScrollAnimations();
  
  console.log('Profocus Media Ghana website initialized');
});

/* ============================================
   MOBILE HAMBURGER MENU
   Why: Essential for mobile usability
   
   Concepts:
   - Event delegation
   - DOM class manipulation
   - ARIA attributes for accessibility
   - Proper keyboard support
============================================ */
function initializeMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  // Toggle menu on hamburger click
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.contains('active');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking on a nav link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburgerBtn.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMenu();
    }
  });

  // Keyboard support - Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  /* Helper Functions */
  function openMenu() {
    hamburgerBtn.classList.add('active');
    navMenu.style.display = 'flex'; // Show menu on mobile
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    navMenu.style.display = ''; // Reset to CSS display value
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
}

/* ============================================
   ACCORDION (FAQ SECTION)
   Why: Improves UX by showing/hiding content
   
   Key Concepts:
   - Event delegation for efficient handling
   - ARIA attributes for accessibility
   - Animation with max-height
   - Hidden attribute for semantic HTML
============================================ */
function initializeAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      // Get the associated content
      const content = header.nextElementSibling;
      
      if (!content || !content.classList.contains('accordion-content')) {
        return;
      }

      // Check if currently expanded
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all other accordion items
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          const otherContent = otherHeader.nextElementSibling;
          if (otherContent) {
            otherContent.hidden = true;
          }
        }
      });

      // Toggle current accordion
      const newState = !isExpanded;
      header.setAttribute('aria-expanded', newState);
      content.hidden = !newState;
    });

    // Keyboard support - Allow Enter/Space to toggle
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/* ============================================
   BOOKING BUTTONS - WHATSAPP INTEGRATION
   Why: Direct WhatsApp booking for easy conversion
   
   Key Concepts:
   - Data attributes for passing information
   - URL encoding for safe message passing
   - Mobile-friendly links
   - Error handling with validation
   
   Security Considerations:
   - Never pass sensitive data in URL
   - WhatsApp number validated format
   - Message text is user-visible (no hidden tokens)
============================================ */
function initializeBookingButtons() {
  const whatsappNumber = '+233549143372'; // Country code + number
  const bookButtons = document.querySelectorAll('.book-btn');

  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Get package name from data attribute
      const packageName = button.getAttribute('data-package') || 'Wedding Package';

      // Create professional booking message
      const message = createBookingMessage(packageName);

      // Convert WhatsApp number to API format (remove +)
      const waNumber = whatsappNumber.replace('+', '').trim();

      // Create WhatsApp API URL
      // Why encodeURIComponent? Safely encodes special characters in URL
      const whatsappURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

      // Open in new tab for better UX
      // Why window.open? Allows opening in background tab on most browsers
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    });
  });

  /**
   * Create a professional booking message
   * Why separate function? Reusable, testable, maintainable
   */
  function createBookingMessage(packageName) {
    return `Hello Profocus Media Ghana,

I would like to enquire about and reserve the ${packageName}.

EVENT DETAILS
• Event Type: [Your event type]
• Event Date: [Your preferred date]
• Event Location: [Your location]

Kindly let me know your availability and the next steps required to secure my booking.

Thank you!`;
  }
}

/* ============================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   Why: Better UX for navigation
   
   Key Concepts:
   - Intersection Observer for efficient detection
   - CSS scroll-behavior: smooth (already set in CSS)
   - Progressive enhancement - works even without JS
============================================ */
function initializeSmoothScroll() {
  // Modern browsers support scroll-behavior in CSS
  // This is a fallback for older browsers
  
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Don't interfere with WhatsApp/external links
      if (href === '#' || href.includes('wa.me') || href.includes('tel:')) {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        
        // Scroll to element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ============================================
   SCROLL ANIMATIONS - FADE IN ON SCROLL
   Why: Visual engagement, modern aesthetic
   
   Key Concepts:
   - Intersection Observer API (modern, efficient)
   - No scroll event spamming (performance)
   - Automatic animation trigger
   - Works with CSS animations
============================================ */
function initializeScrollAnimations() {
  // Add animation class to animate-on-scroll elements
  const elements = document.querySelectorAll(
    '.feature-card, .package-card, .contact-card, .accordion-item'
  );

  if (!('IntersectionObserver' in window)) {
    // Fallback for old browsers - show all elements immediately
    elements.forEach(el => el.style.opacity = '1');
    return;
  }

  // Configuration for Intersection Observer
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        
        // Stop observing once animated (performance optimization)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation keyframes to document
  addAnimationStyles();

  // Start observing elements
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  /**
   * Inject animation CSS if not present
   * Why? Keeps animation logic together with JS logic
   */
  function addAnimationStyles() {
    if (document.getElementById('scroll-animations')) return;

    const style = document.createElement('style');
    style.id = 'scroll-animations';
    style.textContent = `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ============================================
   STICKY NAVBAR ENHANCEMENT
   Why: Improve UX by hiding nav on scroll down
   
   Key Concepts:
   - Throttling for performance
   - Previous scroll position tracking
   - Smooth show/hide animation
============================================ */
function initializeStickyNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    // Clear existing timeout
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Hide navbar when scrolling down, show when scrolling up
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, 100); // Throttle: only check every 100ms
  });
}

/* ============================================
   UTILITY FUNCTIONS FOR COMMON TASKS
   Why: Code reusability and maintainability
============================================ */

/**
 * Safely get element with error handling
 * Why? Prevents errors if element doesn't exist
 */
function getElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
  return element;
}

/**
 * Add class to multiple elements
 * Why? More efficient than individual operations
 */
function addClassToElements(elements, className) {
  elements.forEach(el => {
    if (el) el.classList.add(className);
  });
}

/**
 * Remove class from multiple elements
 */
function removeClassFromElements(elements, className) {
  elements.forEach(el => {
    if (el) el.classList.remove(className);
  });
}

/* ============================================
   ERROR HANDLING & LOGGING
   Why: Better debugging and user experience
============================================ */

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', event.reason);
  // In production, you might send this to an error tracking service
});

// Global error handler
window.addEventListener('error', event => {
  console.error('Global Error:', event.error);
  // In production, you might send this to an error tracking service
});

/* ============================================
   PERFORMANCE MONITORING
   Why: Track performance metrics for optimization
============================================ */

if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    });

    observer.observe({ 
      entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] 
    });
  } catch (e) {
    console.log('Performance monitoring not available:', e);
  }
}

/* ============================================
   COMMON BEGINNER MISTAKES TO AVOID:
   
   1. NOT CHECKING IF ELEMENTS EXIST
      ❌ Bad: document.querySelector('.btn').addEventListener(...)
      ✅ Good: 
         const btn = document.querySelector('.btn');
         if (btn) btn.addEventListener(...)
   
   2. MEMORY LEAKS FROM EVENT LISTENERS
      ❌ Bad: Adding listeners without removing them
      ✅ Good: Use event delegation, remove listeners when needed
   
   3. BLOCKING THE MAIN THREAD
      ❌ Bad: Heavy loops in the main thread
      ✅ Good: Use Web Workers, async/await, setTimeout
   
   4. UNSAFE DOM MANIPULATION
      ❌ Bad: element.innerHTML = userInput
      ✅ Good: element.textContent = userInput (or sanitize HTML)
   
   5. NOT HANDLING ERRORS
      ❌ Bad: fetch(url).then(...)
      ✅ Good: fetch(url).then(...).catch(error => { handle })
   
   6. ACCESSIBILITY IGNORANCE
      ❌ Bad: <div onclick="...">Click me</div>
      ✅ Good: <button type="button">Click me</button>
   
   7. PERFORMANCE ISSUES
      ❌ Bad: Querying DOM in loops
      ✅ Good: Query once, cache in variable
   
============================================ */

/* ============================================
   SECURITY CONSIDERATIONS:
   
   1. XSS (Cross-Site Scripting) Prevention
      - Never use innerHTML with user data
      - Use textContent instead
      - Sanitize HTML when necessary
   
   2. CSRF (Cross-Site Request Forgery)
      - Not applicable for this site (no forms)
      - Always use CSRF tokens for forms
   
   3. Data Protection
      - Never pass sensitive data in URLs
      - Use HTTPS always
      - Don't store tokens in localStorage
   
   4. Third-party Services
      - WhatsApp: Only phone number in URL
      - No sensitive data in links
      - Use rel="noopener noreferrer" for external links
   
============================================ */