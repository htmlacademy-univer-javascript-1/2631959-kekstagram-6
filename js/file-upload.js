import { openUploadForm } from './upload-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const uploadInput = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const loadImagePreview = (file) => {
  const imageUrl = URL.createObjectURL(file);
  imagePreview.src = imageUrl;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url('${imageUrl}')`;
  });
};

const onFileInputChange = () => {
  const file = uploadInput.files[0];

  if (!file) {
    return;
  }

  if (!isValidFileType(file)) {
    uploadInput.value = '';
    return;
  }

  loadImagePreview(file);
  openUploadForm();
};

const initFileUpload = () => {
  uploadInput.addEventListener('change', onFileInputChange);
};

export { initFileUpload };
