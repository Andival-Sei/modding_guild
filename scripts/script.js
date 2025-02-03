document.addEventListener('DOMContentLoaded', () => {

const burger = document.querySelector(".header__burger");
const headerMenu = document.querySelector('.header__menu');
const sections = document.querySelectorAll('.guide__section');
const menuItems = document.querySelectorAll('.aside-navigation__menu-item');
const indicator = document.querySelector('.aside-navigation__indicator');

burger.addEventListener('click', () => {
    burger.classList.toggle("active");
    headerMenu.classList.toggle("active")
})

  // Функция для обновления позиции индикатора
  const updateIndicatorPosition = (activeItem) => {
    if (activeItem && indicator) {
      const itemRect = activeItem.getBoundingClientRect();
      const menuRect = activeItem.parentElement.getBoundingClientRect();
      const topPosition = activeItem.offsetTop + (activeItem.offsetHeight / 2) - (indicator.offsetHeight / 2);
      indicator.style.top = `${topPosition}px`;
    }
  };

  // // Обработчик клика по пунктам меню для ручного переключения
  // menuItems.forEach(item => {
  //   item.addEventListener('click', () => {
  //     menuItems.forEach(el => el.classList.remove('active'));
  //     item.classList.add('active');
  //     updateIndicatorPosition(item);
  //   });
  // });

  // Инициализация позиции индикатора при загрузке страницы
  const initialActive = document.querySelector('.aside-navigation__menu-item.active');
  if (initialActive) {
    updateIndicatorPosition(initialActive);
  } else if (menuItems.length > 0) {
    menuItems[0].classList.add('active');
    updateIndicatorPosition(menuItems[0]);
  }

  // Обработка скролла для автоматического обновления активного пункта меню
  if (sections.length > 0 && menuItems.length > 0) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === entry.target.id) {
              item.classList.add('active');
              updateIndicatorPosition(item);
            }
          });
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }


	const fomodToggles = document.getElementsByClassName('fomod__toggle');

  for (let i = 0; i < fomodToggles.length; i++) {
    fomodToggles[i].addEventListener('click', function () {
      this.classList.toggle('active');
      const fomodContent = this.nextElementSibling;
      const slides = fomodContent.querySelectorAll('.slider__slide');
      
      // Находим высоту самого большого слайда
      let maxHeight = 0;
      slides.forEach(slide => {
        const page = slide.querySelector('.slider__page');
        const measureTarget = page || slide;
        const slideHeight = measureTarget.scrollHeight + parseFloat(window.getComputedStyle(slide).paddingTop) + parseFloat(window.getComputedStyle(slide).paddingBottom);
        if (slideHeight > maxHeight) {
          maxHeight = slideHeight;
        }
      });

      if (fomodContent.style.maxHeight) {
        fomodContent.style.maxHeight = null;
      } else {
        fomodContent.style.maxHeight = maxHeight + 'px';
      }
    });
  }


	const sliders = document.querySelectorAll('.slider');

  sliders.forEach((slider) => {
    const sliderWrapper = slider.querySelector('.slider__wrapper');
    const slidesContainer = slider.querySelector('.slider__slides');
    const slides = slider.querySelectorAll('.slider__slide');
    const btnNext = slider.querySelector('.slider__control--next');
    const btnPrev = slider.querySelector('.slider__control--prev');
    
    let currentIndex = 0;

    // Функция подстройки высоты под текущий слайд
    function adjustHeight() {
      if (!slides.length) return;
      const activeSlide = slides[currentIndex];
      const page = activeSlide.querySelector('.slider__page');
      const measureTarget = page || activeSlide;

      // Используем scrollHeight для учёта всего контента и внутренних отступов
      const newHeight = measureTarget.scrollHeight + parseFloat(window.getComputedStyle(activeSlide).paddingTop) + parseFloat(window.getComputedStyle(activeSlide).paddingBottom);
      console.log('Adjusting height to:', newHeight);
      sliderWrapper.style.maxHeight = newHeight + 'px';
    }

    function updateButtons() {
      btnPrev.disabled = (currentIndex === 0);
      btnNext.disabled = (currentIndex === slides.length - 1);
      btnPrev.classList.toggle('disabled', currentIndex === 0);
      btnNext.classList.toggle('disabled', currentIndex === slides.length - 1);
    }

    // Изначальная настройка
    requestAnimationFrame(() => {
      adjustHeight();
      updateButtons();
    });

    // Переключение вперёд
    btnNext?.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Дождёмся применения transform, потом считаем
        requestAnimationFrame(() => {
          adjustHeight();
          updateButtons();
        });
      }
    });

    // Переключение назад
    btnPrev?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        requestAnimationFrame(() => {
          adjustHeight();
          updateButtons();
        });
      }
    });
  });



	const fileTypeElements = document.querySelectorAll('.mod__file-type');

  fileTypeElements.forEach(el => {
    if (el.classList.contains('mod__file-type--main')) {
      el.textContent = 'Main File';
    } else if (el.classList.contains('mod__file-type--update')) {
      el.textContent = 'Update File';
    } else if (el.classList.contains('mod__file-type--optional')) {
      el.textContent = 'Optional File';
    } else if (el.classList.contains('mod__file-type--miscellaneous')) {
      el.textContent = 'Miscellaneous File';
    }
	});
	
	const filesLabels = document.querySelectorAll('.mod__files-label');
  filesLabels.forEach(label => {
    label.textContent = 'Файлы для скачивания';
	});
	
	const fileVersionElements = document.querySelectorAll('.mod__file-version');

  fileVersionElements.forEach(el => {
    el.insertAdjacentText('afterbegin', 'Версия: ');
	});
	

	const tagTextMap = {
    'tag--cao': 'CAO',
    'tag--classic': 'Classic',
    'tag--creation-kit-resave': 'Creation Kit Resave',
    'tag--esl': 'ESL',
    'tag--bsa': 'Extract the BSA',
		'tag--loot': 'Loot',
		'tag--removal-tool': 'MO2 Removal Tool',
		'tag--tool': 'Tool',
		'tag--xedit-qac': 'xEdit - Quick Auto Clean',
		'tag--zmerge': 'zMerge',
		'tag--special-instructions': 'Special Instructions',
    // Добавьте сюда остальные теги, которые используются на странице common-instructions
    // например:
    // 'tag--other': 'Другой текст'
  };

  // Находим все элементы с классом .tag
  const tagElements = document.querySelectorAll('.tag');
  
  tagElements.forEach(tag => {
    // Для каждого тега определяем его модификатор и находим вложенный элемент с классом .tag__name
    for (const modifier in tagTextMap) {
      if (tag.classList.contains(modifier)) {
        const tagName = tag.querySelector('.tag__name');
        if (tagName) {
          tagName.textContent = tagTextMap[modifier];
        }
        // Если элемент имеет один из модификаторов, прекращаем проверку остальных
        break;
      }
    }
  });

	
});