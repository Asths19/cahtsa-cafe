// ===== GALLERY SLIDER =====
const track = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('sliderDots');
const slides = track ? track.querySelectorAll('.slide') : [];
let current = 0;

function buildDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function goToSlide(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

document.getElementById('prevBtn')?.addEventListener('click', () => goToSlide(current - 1));
document.getElementById('nextBtn')?.addEventListener('click', () => goToSlide(current + 1));

// Auto-advance every 4 seconds
let autoSlide = setInterval(() => goToSlide(current + 1), 4000);
track?.parentElement?.addEventListener('mouseenter', () => clearInterval(autoSlide));
track?.parentElement?.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => goToSlide(current + 1), 4000);
});

if (slides.length > 0) buildDots();

// Touch/swipe support
let touchStartX = 0;
track?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
track?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goToSlide(diff > 0 ? current + 1 : current - 1);
});


// ===== CONTACT TOGGLE =====
const contactBtn = document.getElementById('contactBtn');
const contactCard = document.getElementById('contactCard');

contactBtn?.addEventListener('click', () => {
  const isOpen = contactCard.classList.toggle('open');
  contactBtn.textContent = isOpen ? '✕ close' : '💌 say hello to us';
});


// ===== SMOOTH NAV SCROLL =====
document.querySelectorAll('.whimsy-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});