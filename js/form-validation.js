import { uploadForm, hashtagInput, commentInput, closeUploadForm } from './upload-form.js';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH - 1}}$`, 'i');

const parseHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().toLowerCase().split(/\s+/);
};

const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = parseHashtags(value);
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateHashtagCount = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagUnique = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = parseHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtagFormat,
  'Неправильный формат хэш-тега'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  `Максимум ${MAX_HASHTAGS} хэш-тегов`
);

pristine.addValidator(
  hashtagInput,
  validateHashtagUnique,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  commentInput,
  validateCommentLength,
  `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    closeUploadForm();
    pristine.reset();
  }
});
