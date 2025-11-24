import { photosList } from './main.js';
import { openBigPicture } from './big-picture.js';

const template = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

photosList.forEach((photo) => {
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
