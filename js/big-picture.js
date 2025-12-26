import { isKeyEscape } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

let commentsShown = 0;
const COMMENTS_PER_LOAD = 5;
let keydownController = null;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.append(avatarElement, textElement);
  return commentElement;
};

const renderCommentsBatch = (comments, start, count) => {
  const end = Math.min(start + count, comments.length);
  const fragment = document.createDocumentFragment();
  comments.slice(start, end).forEach((comment) => {
    fragment.append(createComment(comment));
  });
  socialComments.append(fragment);
  commentsShown = end;
  commentShownCount.textContent = commentsShown;
  commentTotalCount.textContent = comments.length;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  if (keydownController) {
    keydownController.abort();
    keydownController = null;
  }
};

const onEscKeyDown = (evt) => {
  if (isKeyEscape(evt.key)) {
    closeBigPicture();
  }
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialComments.replaceChildren();
  commentsShown = 0;
  renderCommentsBatch(photo.comments, 0, COMMENTS_PER_LOAD);
  commentsLoader.onclick = () => {
    renderCommentsBatch(photo.comments, commentsShown, COMMENTS_PER_LOAD);
  };

  if (keydownController) {
    keydownController.abort();
  }
  keydownController = new AbortController();
  document.addEventListener('keydown', onEscKeyDown, {signal: keydownController.signal});
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
