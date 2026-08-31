// ===========================
// CAIXABANK CLONE - JAVASCRIPT
// ===========================

// Hero Slider
let currentSlide = 0;
let totalSlides = 3;
let sliderInterval = null;
let isPaused = false;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  slides.forEach(s => s.classList.remove('slide--active'));
  dots.forEach(d => d.classList.remove('slider-dot--active'));
  
  currentSlide = (index + totalSlides) % totalSlides;
  
  if (slides[currentSlide]) slides[currentSlide].classList.add('slide--active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('slider-dot--active');
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function goToSlide(index) {
  showSlide(index);
}

function togglePause() {
  const btn = document.querySelector('.slider-pause');
  if (isPaused) {
    startSlider();
    if (btn) btn.innerHTML = '&#9646;&#9646;';
    isPaused = false;
  } else {
    stopSlider();
    if (btn) btn.innerHTML = '&#9654;';
    isPaused = true;
  }
}

function startSlider() {
  stopSlider();
  sliderInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }
}

// "También te puede interesar" slider dots
function setInteresarSlide(index) {
  const dots = document.querySelectorAll('.interesar-dot');
  const track = document.getElementById('interesarTrack');
  
  dots.forEach(d => d.classList.remove('interesar-dot--active'));
  if (dots[index]) dots[index].classList.add('interesar-dot--active');
  
  if (track) {
    const cards = track.querySelectorAll('.interesar-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Navigation hover effect
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.color = '#00a1e0';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.color = '';
  });
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Start hero slider auto-play
  startSlider();
  
  // Add body padding to account for cookies banner
  const cookiesBanner = document.getElementById('cookies-banner');
  if (cookiesBanner) {
    function updateBodyPadding() {
      const bannerHeight = cookiesBanner.offsetHeight;
      document.body.style.paddingTop = bannerHeight + 'px';
    }
    updateBodyPadding();
    window.addEventListener('resize', updateBodyPadding);
    
    // When cookies banner is hidden, remove padding
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          if (cookiesBanner.style.display === 'none') {
            document.body.style.paddingTop = '0';
          }
        }
      });
    });
    observer.observe(cookiesBanner, { attributes: true });
  }
  
  // Keyboard navigation for slider
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });
  
  // Touch/swipe support for hero slider
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        changeSlide(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }
  
  // Lazy load simulation - add fade-in for cards
  const cards = document.querySelectorAll('.card-producto, .medida-item, .interesar-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(card);
    });
  }
});
