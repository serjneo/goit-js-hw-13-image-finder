import { form, gallery, button } from './refs';
import getPictures from '../services/apiService';
import cardTpl from '../templates/cardTpl.hbs';
import openModal from './modal';
import '../css/basiclightbox';

form.addEventListener('submit', onLoadPictures);
button.addEventListener('click', addNewPictures);
button.style.display = 'none';
gallery.addEventListener('click', onGalleryClick);

const state = {
  query: '',
  page: 1,
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const targets = document.getElementsByClassName('load-more');

function onLoadPictures(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  state.query = e.currentTarget.elements.query.value;
  button.style.display = 'none';
  state.page = 1;
  getPictures(state.query, state.page).then(resp => {
    if (resp.length) {
      button.style.display = 'block';
    }
    gallery.insertAdjacentHTML('beforeend', cardTpl(resp));
  });
}

function addNewPictures() {
  state.page += 1;
  getPictures(state.query, state.page).then(resp => {
    gallery.insertAdjacentHTML('beforeend', cardTpl(resp));
  });
}

function loadImages() {
  if (state.page > 1) {
    addNewPictures();
  }
}

const observer = new IntersectionObserver(loadImages, options);
[...targets].forEach(target => {
  observer.observe(target);
});

function onGalleryClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  openModal(e.target.dataset.src);
}
