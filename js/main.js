import { loadPhotos } from './miniatures.js';
import { initFileUpload } from './file-upload.js';
import './form-validation.js';

if (window.Cypress && window.___browserSync___ && window.___browserSync___.socket) {
  window.___browserSync___.socket.disconnect();
}

loadPhotos();
initFileUpload();
