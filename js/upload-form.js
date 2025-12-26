import { isKeyEscape } from './utils.js';
import { resetScale } from './image-scale.js';
import { resetEffect } from './image-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const body = document.body;

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
let keydownController = null;

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  if (keydownController) {
    keydownController.abort();
    keydownController = null;
  }
  uploadForm.reset();
  uploadInput.value = '';
  hashtagInput.disabled = false;
  commentInput.disabled = false;
  hashtagInput.removeAttribute('disabled');
  commentInput.removeAttribute('disabled');
  resetScale();
  resetEffect();
  const errorElements = uploadForm.querySelectorAll('.pristine-error, .text__error');
  errorElements.forEach((element) => element.remove());
};

const onDocumentKeydown = (evt) => {
  if (isKeyEscape(evt.key)) {
    if (document.querySelector('.error, .success')) {
      return;
    }
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
  if (keydownController) {
    keydownController.abort();
  }
  keydownController = new AbortController();
  document.addEventListener('keydown', onDocumentKeydown, {signal: keydownController.signal});
  hashtagInput.disabled = false;
  commentInput.disabled = false;
  hashtagInput.removeAttribute('disabled');
  commentInput.removeAttribute('disabled');
  resetScale();
};

uploadCancel.addEventListener('click', closeUploadForm);

export { uploadForm, hashtagInput, commentInput, closeUploadForm, openUploadForm };
