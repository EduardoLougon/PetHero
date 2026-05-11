document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // 3. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // 4. Scroll Animations using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  // Intersection Observer Observation
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  animatedElements.forEach(el => observer.observe(el));

  // 5. Infinite Heroic Carousel
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  let currentIndex = 0;

  // Improved updateCarousel with classes for position
  function moveCarousel(direction) {
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    renderCarousel();
  }

  function renderCarousel() {
    if (!track) return;
    const total = slides.length;

    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev-slide', 'next-slide', 'hidden-slide');

      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index === (currentIndex - 1 + total) % total) {
        slide.classList.add('prev-slide');
      } else if (index === (currentIndex + 1) % total) {
        slide.classList.add('next-slide');
      } else {
        slide.classList.add('hidden-slide');
      }
    });
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => moveCarousel('next'));
    prevBtn.addEventListener('click', () => moveCarousel('prev'));
  }

  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      // Allow clicking on side slides
      if (slide.classList.contains('prev-slide')) {
        moveCarousel('prev');
      } else if (slide.classList.contains('next-slide')) {
        moveCarousel('next');
      }
    });
  });
  renderCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
    const linkCards = document.querySelectorAll('.link-card');

    linkCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Get coordinates of click relative to the card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create ripple span
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Set ripple size and position
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x - size / 2}px`;
            ripple.style.top = `${y - size / 2}px`;

            // Append and remove after animation
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
