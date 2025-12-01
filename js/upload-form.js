import { isKeyEscape } from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const body = document.body;

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isKeyEscape(evt.key)) {
    const activeElement = document.activeElement;
    if (activeElement === hashtagInput || activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }
    closeUploadForm();
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
};

uploadInput.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);

export { uploadForm, hashtagInput, commentInput, closeUploadForm };
