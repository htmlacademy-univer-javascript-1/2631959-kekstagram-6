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
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  updatePhotos();
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos.slice();
  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterClick);
};

export { initFilters };
