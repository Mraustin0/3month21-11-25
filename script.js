// Create floating petals
function createPetals() {
  const petalContainer = document.querySelector('.petal-background');
  if (!petalContainer) return;
  
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 5}s`;
    petal.style.animationDuration = `${15 + Math.random() * 10}s`;
    petalContainer.appendChild(petal);
  }
}

// Create heart particles
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart-particle';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.textContent = '💕';
  document.body.appendChild(heart);
  
  const angle = Math.random() * Math.PI * 2;
  const velocity = 2 + Math.random() * 3;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity;
  let opacity = 1;
  let scale = 0.5 + Math.random() * 0.5;
  
  const animate = () => {
    const currentTop = parseFloat(heart.style.top);
    const currentLeft = parseFloat(heart.style.left);
    
    heart.style.top = `${currentTop + vy}px`;
    heart.style.left = `${currentLeft + vx}px`;
    heart.style.opacity = opacity;
    heart.style.transform = `scale(${scale}) rotate(${opacity * 360}deg)`;
    
    opacity -= 0.02;
    scale += 0.01;
    vy -= 0.1; // gravity
    
    if (opacity > 0 && currentTop > -50) {
      requestAnimationFrame(animate);
    } else {
      heart.remove();
    }
  };
  
  animate();
}

// Confetti effect
function createConfetti() {
  const colors = ['#e8a4c2', '#f5d0e0', '#ffb6c1', '#ffc0cb', '#ffd1dc'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 20);
  }
}

// Cursor trail effect
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
  document.body.appendChild(trail);
  
  cursorTrail.push(trail);
  if (cursorTrail.length > trailLength) {
    const old = cursorTrail.shift();
    old.remove();
  }
  
  setTimeout(() => {
    trail.style.opacity = '0';
    trail.style.transform = 'scale(0)';
    setTimeout(() => trail.remove(), 300);
  }, 100);
});

// Typewriter effect for hero
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1000);
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
      
      // Add sparkles when section becomes visible
      if (entry.target.classList.contains('section')) {
        const rect = entry.target.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createSparkle(
              rect.left + Math.random() * rect.width,
              rect.top + Math.random() * rect.height
            );
          }, i * 100);
        }
      }
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
  
  // Auto-play video when it comes into view
  const video = document.querySelector('.media');
  if (video) {
    // Try to play immediately
    video.play().catch(() => {
      // If autoplay fails, play when video is visible
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // User interaction may be required
              console.log('Video autoplay requires user interaction');
            });
          }
        });
      }, { threshold: 0.5 });
      
      videoObserver.observe(video);
    });
  }
  
  // Typewriter effect for hero title (optional - can be enabled)
  // const heroTitle = document.querySelector('.hero-content h1');
  // if (heroTitle) {
  //   const originalText = heroTitle.textContent;
  //   typeWriter(heroTitle, originalText, 80);
  // }
});

// Letter Modal with enhanced effects
const letterModal = document.querySelector('.letter-modal');
const openLetterBtn = document.getElementById('open-letter');
const closeTargets = document.querySelectorAll('[data-close]');

const openLetter = () => {
  letterModal?.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Create confetti and hearts
  createConfetti();
  
  // Create hearts from button position
  const rect = openLetterBtn?.getBoundingClientRect();
  if (rect) {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createHeart(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
      }, i * 50);
    }
  }
  
  // Add sparkles around letter
  setTimeout(() => {
    const letterCard = document.querySelector('.letter-card');
    if (letterCard) {
      const rect = letterCard.getBoundingClientRect();
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createSparkle(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 100);
      }
    }
  }, 1000);
};

const closeLetter = () => {
  letterModal?.classList.remove('active');
  document.body.style.overflow = '';
};

openLetterBtn?.addEventListener('click', () => {
  openLetter();
});

// Add sparkle on button hover
openLetterBtn?.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.7) {
    createSparkle(e.clientX, e.clientY);
  }
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

// Enhanced parallax effect for hero
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scroll = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scroll < window.innerHeight) {
    const parallax = scroll * 0.3;
    hero.style.transform = `translateY(${parallax}px)`;
    hero.style.opacity = Math.max(0.3, 1 - scroll / window.innerHeight);
  }
  lastScroll = scroll;
});

// Add sparkles on video hover and track mouse for glow effect
const videoCard = document.querySelector('.media-card');
videoCard?.addEventListener('mousemove', (e) => {
  const rect = videoCard.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  videoCard.style.setProperty('--mouse-x', `${x}%`);
  videoCard.style.setProperty('--mouse-y', `${y}%`);
  
  if (Math.random() > 0.85) {
    createSparkle(e.clientX, e.clientY);
  }
});

// Mouse follower effect for hero
const hero = document.querySelector('.hero');
hero?.addEventListener('mousemove', (e) => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
});

// Easter egg: Konami code or secret click
let clickCount = 0;
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-title')) {
    clickCount++;
    if (clickCount === 7) {
      createConfetti();
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          createHeart(e.clientX, e.clientY);
        }, i * 50);
      }
      clickCount = 0;
    }
  } else {
    clickCount = 0;
  }
});
