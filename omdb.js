const apiKeyInput = document.getElementById('apiKeyInput');
const movieTitleInput = document.getElementById('movieTitleInput');
const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const results = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value;
    const movieTitle = movieTitleInput.value;

    if (apiKey && movieTitle) {
        loader.style.display = 'block';
        error.textContent = '';
        results.innerHTML = '';

        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                loader.style.display = 'none';
                if (data.Response === 'True') {
                    data.Search.forEach(movie => {
                        results.innerHTML += `
                            <div class="movie-card">
                                <img src="${movie.Poster}" alt="${movie.Title}">
                                <h3>${movie.Title} (${movie.Year})</h3>
                                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
                            </div>
                        `;
                    });
                } else {
                    error.textContent = data.Error;
                }
            })
            .catch(error => {
                loader.style.display = 'none';
                error.textContent = 'An error occurred. Please try again later.';
            });
    } else {
        error.textContent = 'Please provide both API Key and Movie Title.';
    }
});
