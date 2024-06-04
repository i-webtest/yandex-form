export const carousel = () => {
  const slider = document.querySelector('.participants__list');
  const slides = document.querySelectorAll('.participants__item');
  const controller = document.querySelector('.participants__controller');
  const nextBtn = document.querySelector('.participants__button-next');
  const prevBtn = document.querySelector('.participants__button-prev');
  const count = document.querySelector('.participants__count');
  const total = document.querySelector('.participants__total');

  const timeInterval = 4000;
  let slideLength = 4;

  let interval;
  let currentSlide = 0;

  if (window.innerWidth <= 768) {
    slideLength = 5;
  }

  if (window.innerWidth <= 580) {
    slideLength = 6;
  }

  const counter = (n) => {
    let counter = 3;

    if (window.innerWidth <= 768) {
      counter = 2;
    }

    if (window.innerWidth <= 580) {
      counter = 1;
    }

    count.textContent = counter + n;
  };

  counter(currentSlide);

  const showSlide = () => {
    slides.forEach((slide) => {
      const slideWidth = slide.clientWidth + 20;

      slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    });
  };

  const autoSlide = () => {
    showSlide();
    currentSlide++;

    if (currentSlide >= slideLength) {
      currentSlide = 0;
    }

    counter(currentSlide);
    showSlide();
  };

  if (slideLength > 0) {
    controller.addEventListener('click', ({ target }) => {
      if (!target.closest('.participants__button')) {
        return;
      }

      showSlide();

      if (target.closest('.participants__button-next')) currentSlide++;

      if (target.closest('.participants__button-prev')) currentSlide--;

      if (currentSlide >= slideLength) {
        currentSlide = 0;
        counter(currentSlide);
      }

      if (currentSlide < 0) {
        currentSlide = slideLength - 1;
        counter(currentSlide);
      }

      counter(currentSlide);
      showSlide();
    });
  }

  const startSlide = (timer = 1500) => {
    interval = setInterval(autoSlide, timer);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  controller.addEventListener(
    'mouseenter',
    ({ target }) => {
      if (target.closest('.participants__button')) stopSlide();
    },
    true,
  );

  controller.addEventListener(
    'mouseleave',
    ({ target }) => {
      if (target.closest('.participants__button')) startSlide(timeInterval);
    },
    true,
  );

  document.addEventListener('DOMContentLoaded', () => {
    startSlide(timeInterval);
  });

  // startSlide(timeInterval);
};
