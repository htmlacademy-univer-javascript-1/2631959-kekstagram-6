import { isKeyEscape } from './utils.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const body = document.body;

const showMessage = (template, onClose) => {
  const messageElement = template.cloneNode(true);
  body.append(messageElement);

  const messageSection = document.querySelector('.success, .error');
  messageSection.style.zIndex = '10000';
  const closeButton = messageSection.querySelector('button');
  let keydownController = null;

  const closeMessage = () => {
    messageSection.remove();
    if (keydownController) {
      keydownController.abort();
      keydownController = null;
    }

    if (onClose) {
      onClose();
    }
  };

  const onDocumentKeydown = (evt) => {
    if (isKeyEscape(evt.key)) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      closeMessage();
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target === messageSection) {
      closeMessage();
    }
  };

  closeButton.addEventListener('click', closeMessage);
  messageSection.addEventListener('click', onOverlayClick);
  keydownController = new AbortController();
  document.addEventListener('keydown', onDocumentKeydown, {signal: keydownController.signal});
};

const showSuccessMessage = (onClose) => {
  showMessage(successTemplate, onClose);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
