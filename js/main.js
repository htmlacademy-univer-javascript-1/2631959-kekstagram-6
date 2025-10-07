const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Елена',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Ольга',
  'Александр',
  'Татьяна',
  'Максим',
  'Наталья',
  'Андрей',
  'Екатерина',
  'Павел',
  'Светлана',
  'Алексей',
  'Юлия',
  'Николай',
  'Виктория'
];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

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
