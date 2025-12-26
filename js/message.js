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

  const closeMessage = () => {
    messageSection.remove();
    document.removeEventListener('keydown', onDocumentKeydown);

    if (onClose) {
      onClose();
    }
  };

  function onDocumentKeydown(evt) {
    if (isKeyEscape(evt.key)) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      closeMessage();
    }
  }

  const onOverlayClick = (evt) => {
    if (evt.target === messageSection) {
      closeMessage();
    }
  };

  closeButton.addEventListener('click', closeMessage);
  messageSection.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = (onClose) => {
  showMessage(successTemplate, onClose);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
