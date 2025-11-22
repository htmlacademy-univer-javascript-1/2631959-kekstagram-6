import { MESSAGES, NAMES } from './const.js';
import { getRandomNumber, getRandomElement } from './utils.js';

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

export { createPhoto };
