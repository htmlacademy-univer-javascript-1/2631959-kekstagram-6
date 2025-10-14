import { MESSAGES, NAMES } from './data.js';
import { getRandomNumber, getRandomElement } from './util.js';

const createComment = (id) => {
  return {
    id: id,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES)
  };
};

const createComments = () => {
  const commentsCount = getRandomNumber(0, 30);
  const comments = [];

  for (let i = 1; i <= commentsCount; i++) {
    comments.push(createComment(i));
  }

  return comments;
};

const createPhoto = (id) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии номер ${id}`,
    likes: getRandomNumber(15, 200),
    comments: createComments()
  };
};

const createPhotos = () => {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

const photosData = createPhotos();

console.log(photosData);
