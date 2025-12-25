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
  const errorElement = document.createElement('div');
  errorElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ff4444;
    color: white;
    padding: 20px;
    border-radius: 8px;
    font-size: 18px;
    z-index: 1000;
  `;
  errorElement.textContent = message;
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
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
