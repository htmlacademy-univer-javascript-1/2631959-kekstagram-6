const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

let commentsShown = 0;
const COMMENTS_PER_LOAD = 5;

const createComment = (comment) => `
    <li class="social__comment">
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
  `;

const renderCommentsBatch = (comments, start, count) => {
  const end = Math.min(start + count, comments.length);
  const commentsHTML = comments
    .slice(start, end)
    .map(createComment)
    .join('');

  socialComments.insertAdjacentHTML('beforeend', commentsHTML);
  commentsShown = end;
  commentCount.textContent = `${commentsShown} из ${comments.length} комментариев`;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';
  commentsShown = 0;
  renderCommentsBatch(photo.comments, 0, COMMENTS_PER_LOAD);
  commentsLoader.onclick = () => {
    renderCommentsBatch(photo.comments, commentsShown, COMMENTS_PER_LOAD);
  };

  document.addEventListener('keydown', onEscKeyDown);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
