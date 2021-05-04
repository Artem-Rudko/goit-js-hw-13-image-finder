// import searchFormTmpl from "./templates/search-form.hbs";
import './styles.css';
import GetPhotoApi from "./apiService.js";
import photoCardTmpl from "./templates/photo-card.hbs";


const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    photoGallery: document.querySelector('.gallery')
};

const getPhotoApi = new GetPhotoApi();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();
    clearPhotoGallery();
    getPhotoApi.query = e.currentTarget.elements.query.value;
    getPhotoApi.resetPageNumber();
    getPhotoApi.fetchPhotos().then(renderPhotoGallery);
    refs.loadMoreBtn.classList.remove('is-hidden');
};

function onLoadMore(e) {
    this.pageNumber +=1;
    getPhotoApi.fetchPhotos().then(renderPhotoGallery);
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
}

function renderPhotoGallery(hits) {
    refs.photoGallery.insertAdjacentHTML('beforeend', photoCardTmpl(hits));
}

function clearPhotoGallery() {
    refs.photoGallery.innerHTML = '';
}