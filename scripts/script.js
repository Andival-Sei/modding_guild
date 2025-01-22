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

  // Обработчик клика по пунктам меню для ручного переключения
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      updateIndicatorPosition(item);
    });
  });

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

  // Обработчик клика на бургер для открытия/закрытия меню
  if (burger && headerMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle("active");
      headerMenu.classList.toggle("active");
    });
  }
});