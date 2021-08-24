import * as basicLightbox from 'basiclightbox';

function openModal(src) {
  const instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">
`);

  instance.show();
}

export default openModal;
