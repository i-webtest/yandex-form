'use strict';

const cardText = [
  'Строительство железнодорожной магистрали Москва-Васюки',
  'Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов',
  'Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет',
  'Строительство дворца для турнира',
  'Размещение гаражей для гостевого автотранспорта',
  'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов',
  'Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн',
];

export const slider = () => {
  const slider = document.querySelector('.slider');
  const sliderController = document.querySelector('.slider-controller');
  const sliderPagination = document.querySelector('.slider-pagination');
  const prevBtn = document.querySelector('.slider-button-prev');
  const nextBtn = document.querySelector('.slider-button-next');

  let dots = document.querySelectorAll('.slider-pagination__dot');

  let currentSlideIndex = 0;

  const prevSlide = (elems, index, strClass) => {
    elems[index].classList.remove(strClass);
  };

  const nextSlide = (elems, index, strClass) => {
    elems[index].classList.add(strClass);
  };

  cardText.map((item, index) => {
    const slides = document.createElement('li');
    slides.classList.add('slider__slide');

    const article = document.createElement('article');
    article.classList.add('slider__card');

    const text = document.createElement('p');
    text.classList.add('slider__card-description');
    text.textContent = item;

    article.append(text);
    slides.append(article);
    slider.append(slides);
  });

  const slides = document.querySelectorAll('.slider__slide');
  slides[0].classList.add('active');

  const cards = document.querySelectorAll('.slider__card');

  const cardDescription = document.querySelectorAll('.slider__card-description');

  if (window.innerWidth <= 768) {
    const slides = document.querySelectorAll('.slider__slide');
    slides[0].classList.add('active');

    const arr = [];
    cards[0].classList.add('active');
    cards[0].append(cardDescription[1]);
    cards[1].append(cardDescription[2]);
    cards[2].append(cardDescription[3], cardDescription[4]);
    cards[3].append(cardDescription[5]);
    cards[4].append(cardDescription[6]);

    arr.push(cards[0], cards[1], cards[2], cards[3], cards[4]);
    console.log('arr: ', arr);

    const updateButtons = () => {
      const isLastSlide = currentSlideIndex === arr.length - 1;
      nextBtn.disabled = isLastSlide;
      prevBtn.disabled = currentSlideIndex === 0;
    };

    updateButtons();

    if (arr.length > 0) {
      sliderController.addEventListener('click', ({ target }) => {
        prevSlide(slides, currentSlideIndex, 'active');
        prevSlide(dots, currentSlideIndex, 'active');

        if (target.closest('.slider-button-next')) {
          currentSlideIndex++;

          if (currentSlideIndex >= arr.length) {
            return currentSlideIndex;
          }

          updateButtons();
        }

        if (target.closest('.slider-button-prev')) {
          currentSlideIndex--;
          updateButtons();
        }

        if (target.classList.contains('slider-pagination__dot')) {
          dots.forEach((dot, index) => {
            if (target === dot) {
              currentSlideIndex = index;
              updateButtons();
            }
          });
        }

        if (currentSlideIndex >= arr.length) {
          currentSlideIndex = 0;
        }

        if (currentSlideIndex < 0) {
          currentSlide = arr.length - 1;
        }

        nextSlide(slides, currentSlideIndex, 'active');
        nextSlide(dots, currentSlideIndex, 'active');
      });
    }

    const createDots = () => {
      arr.forEach((item, index) => {
        const dot = document.createElement('li');
        dot.classList.add('slider-pagination__dot');

        if (item.classList.contains('active')) {
          dot.classList.add('active');
          currentSlideIndex = index;
        }

        sliderPagination.append(dot);
      });

      dots = document.querySelectorAll('.slider-pagination__dot');
    };

    createDots();
  }
};
