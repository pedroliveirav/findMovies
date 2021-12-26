// Swiper.js

var swiper = new Swiper(".findMoviesSwiper", {
    slidesPerView: 6,
    spaceBetween: 30
});

// Switch and Search

const popularMovies = document.querySelectorAll('.findMovies-popular-movie');
const movieTitle = document.querySelector('.findMovies-title');
const movieScore = document.querySelector('.findMovies-score');
const movieDescription = document.querySelector('.findMovies-description');
const popularMoviesContent = document.querySelector('.findMovies-content');

const getPopularMovies = () => {

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=c21528022006d9c82b5cb75486456ef0&language=en-US&page=1").then(res => res.json()).then(res => {

        for (let i = 0; i < res.results.length; i++) {
            popularMovies[i].style.backgroundImage = 'url(https://image.tmdb.org/t/p/original' + res.results[i].poster_path + ')';

            popularMovies[i].setAttribute("id", res.results[i].id)
            
        }

    })
    
}

const setTitle = (title) => {
    movieTitle.innerText = title;
}

const setScore = (score) => {
    movieScore.innerText = score;
}

const setDescription = (description) => {
    movieDescription.innerText = description;
}

const getMovieById = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c21528022006d9c82b5cb75486456ef0&language=en-US`).then(res => res.json()).then(res => {

        setTitle(res.title);
        setScore(res.vote_average);
        setDescription(res.overview);
    })
}

const handleSelectMovie = (movieNumber) => {
    const selectedMovieId = popularMovies[movieNumber-1].getAttribute("id");
    getMovieById(selectedMovieId);
}

const searchByTitle = () => {
    const movieTitleInput = document.querySelector('.findMovies-movie-title-input').value;
    const movieImage = document.querySelector('.findMovies-seached-film-image');

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=c21528022006d9c82b5cb75486456ef0&query=${movieTitleInput}`).then(res => res.json()).then(res => {
        for (let i = 0; i < res.results.length; i++) {
            popularMovies[i].style.backgroundImage = 'url(https://image.tmdb.org/t/p/original' + res.results[i].poster_path + ')';
            popularMovies[i].setAttribute("id", res.results[i].id)
            
        }    
    })
}