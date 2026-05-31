console.log("Website loaded");

const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let current = 0;
let autoSlide = null;

function stopAllVideos() {
  slides.forEach((slide) => {
    if (slide.tagName === 'VIDEO') {
      slide.pause();
      slide.currentTime = 0;
      slide.onended = null;
    }
  });
}

function clearActiveSlides() {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
}

function startImageTimer() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    goToNextSlide();
  }, 5000);
}

function startCoohoomTimer() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    goToNextSlide();
  }, 8000);
}

function showSlide(index) {
  clearInterval(autoSlide);
  clearActiveSlides();
  stopAllVideos();

  current = index;
  const activeSlide = slides[current];
  activeSlide.classList.add('active');

  if (activeSlide.tagName === 'VIDEO') {
    activeSlide.play();

    activeSlide.onended = () => {
      goToNextSlide();
    };
  } else if (activeSlide.classList.contains('coohom-slide')) {
    startCoohoomTimer();
  } else {
    startImageTimer();
  }
}

function goToNextSlide() {
  const nextIndex = (current + 1) % slides.length;
  showSlide(nextIndex);
}

function goToPrevSlide() {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

if (nextBtn) {
  nextBtn.addEventListener('click', goToNextSlide);
}

if (prevBtn) {
  prevBtn.addEventListener('click', goToPrevSlide);
}

showSlide(0);

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach((acc) => {
      acc.classList.remove('active');
      const icon = acc.querySelector('.icon');
      if (icon) icon.textContent = '+';
    });

    if (!isActive) {
      item.classList.add('active');
      const icon = item.querySelector('.icon');
      if (icon) icon.textContent = '−';
    }
  });
});

const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  const section = document.querySelector('.stats-grid');
  if (!section) return;

  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.max(1, Math.ceil(target / 80));
      const speed = 25;

      const updateCounter = () => {
        count += increment;

        if (count >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = count;
          setTimeout(updateCounter, speed);
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);