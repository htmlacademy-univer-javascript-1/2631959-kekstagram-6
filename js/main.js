import { createPhoto } from './generator.js';

const photosList = [];

for (let i = 1; i <= 25; i++) {
  photosList.push(createPhoto(i));
}

export { photosList };
