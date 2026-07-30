/**
 * PREMIUM PORTFOLIO - INTERACTIVE SCRIPT
 * Author: Chidochashe Chakacha
 * Features: Navigation, animations, particles, magnetic effects, counters
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  initializeParticles();
  initializeNavigation();
  initializeScrollEffects();
  initializeCounterAnimation();
  initializeMagneticEffect();
  initializeIntersectionObserver();
});

// ============================================
// PARTICLE BACKGROUND ANIMATION
// ============================================

function initializeParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const particleCount = window.innerWidth < 700 ? 14 : 24;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200 - 100;
    const duration = Math.random() * 20 + 20;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    particlesContainer.appendChild(particle);
  }

  // Regenerate particles periodically
  setInterval(() => {
    particlesContainer.innerHTML = '';
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200 - 100;
      const duration = Math.random() * 20 + 20;

      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';

      particlesContainer.appendChild(particle);
    }
  }, 40000);
}

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();
}

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SCROLL EFFECTS & ANIMATIONS
// ============================================

function initializeScrollEffects() {
  // Parallax effect on hero profile image
  const profileImage = document.querySelector('.profile-image');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    if (profileImage) {
      const scrollPosition = window.scrollY;
      const offset = scrollPosition * 0.12;
      profileImage.style.transform = `translateY(${offset}px)`;
    }
  });
}

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================
// ANIMATED COUNTER FOR STATISTICS
// ============================================

function initializeCounterAnimation() {
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        animateCounter(entry.target);
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const start = Date.now();

  const animate = () => {
    const now = Date.now();
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  animate();
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================

function initializeMagneticEffect() {
  const magneticElements = document.querySelectorAll('[data-interaction="magnetic"]');

  magneticElements.forEach(element => {
    element.addEventListener('mousemove', handleMagneticMove);
    element.addEventListener('mouseleave', handleMagneticLeave);
  });

  function handleMagneticMove(e) {
    const element = this;
    const elementRect = element.getBoundingClientRect();
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = mouseX - centerX;
    const distY = mouseY - centerY;

    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxDistance = 100;

    if (distance < maxDistance && distance > 0) {
      const strength = 1 - distance / maxDistance;
      const moveX = (distX / distance) * strength * 20;
      const moveY = (distY / distance) * strength * 20;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }

  function handleMagneticLeave() {
    this.style.transform = 'translate(0, 0)';
  }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// RIPPLE EFFECT ON CLICK (Optional Enhancement)
// ============================================

function addRippleEffect() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

addRippleEffect();

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger?.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu?.classList.remove('active');
    }
  }

  // Tab through nav links
  if (e.key === 'Tab') {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('focus', () => {
        link.classList.add('active');
      });
      link.addEventListener('blur', () => {
        updateActiveNavLink();
      });
    });
  }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('resize', debounce(() => {
  updateActiveNavLink();
}, 250));

// ============================================
// CONTACT FORM INTERACTION (if added in future)
// ============================================

function initializeFormInteractions() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  });
}

initializeFormInteractions();

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Ensure proper focus management
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement.className.includes('btn')) {
    document.activeElement.click();
  }
});

// Add aria-current to active nav link
function updateAriaAttributes() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.classList.contains('active')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('scroll', updateAriaAttributes);
updateAriaAttributes();

// ============================================
// LOGGER (for debugging)
// ============================================

console.log('✨ Chidochashe Chakacha Portfolio - Loaded Successfully');
console.log('🎨 Features: Particles, Navigation, Animations, Counters, Magnetic Effects');
