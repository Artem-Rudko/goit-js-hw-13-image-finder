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


function onSearch(event) {
    event.preventDefault();
    clearPhotoGallery();
    getPhotoApi.query = event.currentTarget.elements.query.value;
    getPhotoApi.resetPageNumber();
    getPhotoApi.fetchPhotos().then(renderPhotoGallery);
    refs.loadMoreBtn.classList.remove('is-hidden');
};

function onLoadMore(event) {
    this.pageNumber +=1;
    getPhotoApi.fetchPhotos().then(renderPhotoGallery);
    // scrollDown();
    setTimeout(scrollDown, 1000);
}

function renderPhotoGallery(hits) {
    refs.photoGallery.insertAdjacentHTML('beforeend', photoCardTmpl(hits));
}

function clearPhotoGallery() {
    refs.photoGallery.innerHTML = '';
}

function scrollDown() {
    window.scrollTo({
        top: document.body.scrollHeight-2900,
        behavior: 'smooth',
    });
}