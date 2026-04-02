/**
 * BuildRight Construction — Main JavaScript
 * Vanilla ES6+ | No frameworks
 * Features: Navbar scroll, mobile menu, smooth scroll, active nav,
 *           contact form validation, back-to-top button
 */

'use strict';

/* ── DOM References ─────────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const navToggle  = document.getElementById('navToggle');
const navMenu    = document.getElementById('navMenu');
const navLinks   = document.querySelectorAll('.navbar__link');
const backToTop  = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

/* ── Utility: throttle ──────────────────────────────────────── */
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/* ── Utility: debounce ──────────────────────────────────────── */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ============================================================
   NAVBAR — scroll behaviour & active link highlighting
   ============================================================ */
function handleNavbarScroll() {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', throttle(handleNavbarScroll, 100), { passive: true });

/* Run once on load in case page is already scrolled */
handleNavbarScroll();

/* ── Active nav link on scroll ──────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollPos = window.scrollY + navbar.offsetHeight + 40;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.navbar__link[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

window.addEventListener('scroll', throttle(updateActiveNavLink, 150), { passive: true });
updateActiveNavLink();

/* ============================================================
   MOBILE MENU — toggle open/close
   ============================================================ */
function openMenu() {
  navMenu.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

/* Close menu when a nav link is clicked */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) closeMenu();
  });
});

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('open') &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

/* Close menu on Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
});

/* ============================================================
   SMOOTH SCROLL — for all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const offset = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });

    /* Update URL hash without jumping */
    history.pushState(null, '', targetId);
  });
});

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   CONTACT FORM — validation & submission simulation
   ============================================================ */
const validators = {
  name: {
    validate: (val) => val.trim().length >= 2,
    message: 'Please enter your full name (at least 2 characters).'
  },
  email: {
    validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    message: 'Please enter a valid email address.'
  },
  message: {
    validate: (val) => val.trim().length >= 10,
    message: 'Please enter a message (at least 10 characters).'
  }
};

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (!field || !validators[fieldId]) return true;

  const isValid = validators[fieldId].validate(field.value);
  field.classList.toggle('invalid', !isValid);
  if (errorEl) {
    errorEl.textContent = isValid ? '' : validators[fieldId].message;
  }
  return isValid;
}

/* Live validation on blur */
['name', 'email', 'message'].forEach(id => {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('blur', () => validateField(id));
    field.addEventListener('input', debounce(() => {
      if (field.classList.contains('invalid')) validateField(id);
    }, 300));
  }
});

/* Form submit */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValid    = validateField('name');
    const emailValid   = validateField('email');
    const messageValid = validateField('message');

    if (!nameValid || !emailValid || !messageValid) {
      /* Focus first invalid field */
      const firstInvalid = contactForm.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Simulate async submission */
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      /* Show success message */
      formSuccess.classList.add('visible');
      contactForm.reset();

      /* Remove invalid states */
      contactForm.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
      contactForm.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      /* Hide success after 6 seconds */
      setTimeout(() => formSuccess.classList.remove('visible'), 6000);
    }, 1200);
  });
}

/* ============================================================
   INTERSECTION OBSERVER — fade-in animation on scroll
   ============================================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Observe animatable elements */
document.querySelectorAll(
  '.service-card, .team-card, .project-card, .contact__info, .contact__form-wrap, .hero__stat'
).forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

/* ── Inject fade-up animation styles dynamically ────────────── */
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .fade-up.in-view {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .fade-up { opacity: 1; transform: none; transition: none; }
  }
`;
document.head.appendChild(fadeStyle);

/* ============================================================
   STAGGERED ANIMATION for service cards & team cards
   ============================================================ */
document.querySelectorAll('.services__grid .service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

document.querySelectorAll('.team__grid .team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 100}ms`;
});
