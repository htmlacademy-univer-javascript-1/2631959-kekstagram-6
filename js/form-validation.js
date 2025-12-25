import { uploadForm, hashtagInput, commentInput, closeUploadForm } from './upload-form.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const submitButton = uploadForm.querySelector('.img-upload__submit');

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(uploadForm);

    sendData(formData)
      .then(() => {
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
});
