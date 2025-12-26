import { openBigPicture } from './big-picture.js';
import { getData } from './api.js';
import { initFilters } from './filters.js';

const template = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

const clearPictures = () => {
  container.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const renderPictures = (photos) => {
  clearPictures();

  photos.forEach((photo) => {
    const element = template.cloneNode(true);
    const pictureLink = element.querySelector('.picture');

    const image = element.querySelector('.picture__img');
    const likes = element.querySelector('.picture__likes');
    const comments = element.querySelector('.picture__comments');

    image.src = photo.url;
    image.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    pictureLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    container.appendChild(element);
  });
};

const showError = (message) => {
  const existingError = document.querySelector('.data-error');
  if (existingError) {
    existingError.remove();
  }

  const errorElement = document.createElement('div');
  errorElement.className = 'data-error';
  errorElement.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    padding: 12px 16px;
    background: rgba(255, 68, 68, 0.95);
    color: #ffffff;
    font-size: 16px;
    z-index: 10000;
    text-align: center;
  `;
  errorElement.textContent = message;
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 10000);
};

const loadPhotos = () => {
  getData()
    .then((photos) => {
      renderPictures(photos);
      initFilters(photos);
    })
    .catch((err) => {
      showError(err.message);
    });
};

export { loadPhotos, renderPictures };
