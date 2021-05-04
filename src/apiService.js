const API_KEY = '21433732-4f4ab4e06b98cffafd914747a';
const BASE_URL = 'https://pixabay.com';

export default class GetPhotoApi {
    constructor () {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

    fetchPhotos () {
        const url = `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`;
        
        return fetch(url)
        .then(response => {return response.json()})
        .then(({ hits }) => {
            this.pageNumber += 1;
            return hits;
        })
        .catch(error => console.log(error));
    }

    resetPageNumber() {
        this.pageNumber = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery=newQuery;
    }
}