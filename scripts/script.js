// Получаем элементы
const galleryTrack = document.querySelector('.gallery__track');
const slides = Array.from(galleryTrack.children);
const slideWidth = galleryTrack.clientWidth;

// Расставляем слайды
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// Обработчики событий
galleryTrack.addEventListener('mousedown', touchStart);
galleryTrack.addEventListener('mouseup', touchEnd);
galleryTrack.addEventListener('mouseleave', touchEnd);
galleryTrack.addEventListener('mousemove', touchMove);

galleryTrack.addEventListener('touchstart', touchStart);
galleryTrack.addEventListener('touchend', touchEnd);
galleryTrack.addEventListener('touchmove', touchMove);

function touchStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  galleryTrack.style.cursor = 'grabbing';
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) {
    currentIndex = (currentIndex + 1) % slides.length;
  }

  if (movedBy > 100) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  }

  setPositionByIndex();
  galleryTrack.style.cursor = 'grab';
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = -currentIndex * slideWidth;
  prevTranslate = currentTranslate;
  galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
}

// Отключаем контекстное меню
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};
