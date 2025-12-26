import { renderPictures } from './miniatures.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

let currentFilter = Filter.DEFAULT;
let photos = [];

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getRandomPhotos = (items) => {
  const shuffled = items.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return getRandomPhotos(photos);
    case Filter.DISCUSSED:
      return photos.slice().sort(sortByComments);
    default:
      return photos;
  }
};

const updatePhotos = debounce(() => {
  const filteredPhotos = getFilteredPhotos();
  renderPictures(filteredPhotos);
}, DEBOUNCE_DELAY);

const onFilterClick = (evt) => {
  let clickedButton = null;
  const currentTarget = evt.currentTarget;

  if (currentTarget && currentTarget.classList && currentTarget.classList.contains('img-filters__button')) {
    clickedButton = currentTarget;
  } else {
    const targetElement = evt.target instanceof Element ? evt.target : evt.target.parentElement;
    clickedButton = targetElement ? targetElement.closest('.img-filters__button') : null;
  }

  if (!clickedButton) {
    return;
  }

  if (clickedButton.id === currentFilter) {
    return;
  }

  const activeButton = filtersForm.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  updatePhotos();
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos.slice();
  filtersContainer.classList.remove('img-filters--inactive');
};

if (filtersForm) {
  filtersForm.addEventListener('click', onFilterClick);
  filtersForm.querySelectorAll('.img-filters__button').forEach((button) => {
    button.addEventListener('click', onFilterClick);
  });
}

export { initFilters };
