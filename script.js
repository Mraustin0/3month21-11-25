// Create floating petals
function createPetals() {
  const petalContainer = document.querySelector('.petal-background');
  if (!petalContainer) return;
  
  for (let i = 0; i < 9; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petalContainer.appendChild(petal);
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
  createPetals();
  
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Letter Modal
const letterModal = document.querySelector('.letter-modal');
const openLetterBtn = document.getElementById('open-letter');
const closeTargets = document.querySelectorAll('[data-close]');

const openLetter = () => {
  letterModal?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeLetter = () => {
  letterModal?.classList.remove('active');
  document.body.style.overflow = '';
};

openLetterBtn?.addEventListener('click', () => {
  openLetter();
});

closeTargets.forEach(target => {
  target.addEventListener('click', () => {
    closeLetter();
  });
});

letterModal?.addEventListener('click', (event) => {
  if (event.target === letterModal) {
    closeLetter();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && letterModal?.classList.contains('active')) {
    closeLetter();
  }
});

// Smooth scroll for navigation
const navLink = document.querySelector('.nav-link');
navLink?.addEventListener('click', (e) => {
  e.preventDefault();
  const targetId = navLink.getAttribute('href');
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Parallax effect for hero
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scroll = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scroll < window.innerHeight) {
    const parallax = scroll * 0.3;
    hero.style.transform = `translateY(${parallax}px)`;
    hero.style.opacity = 1 - scroll / window.innerHeight;
  }
  lastScroll = scroll;
});
