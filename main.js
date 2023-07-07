const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieResults = document.getElementById('movie-results');

// searchButton.addEventListener('click', () => {
//   const searchTerm = searchInput.value;
//   if (searchTerm !== '') {
//     fetchMovieData(searchTerm);
//   } else {
//     alert('Please enter a movie title');
//   }
// });

searchInput.addEventListener('keydown', (event) => {
  const searchTerm = searchInput.value
  if(event.key==="Enter"){
    event.preventDefault()
    searchButton.click()
    if (searchTerm !== '') {
      fetchMovieData(searchTerm);
    } else {
      alert('Please enter a movie title');
    }
  }
});


async function fetchMovieData(searchTerm) {
  const apiUrl = `http://www.omdbapi.com/?apikey=c8bd318d&s=${searchTerm}`;
  const data = await fetch(apiUrl).then(response => response.json());
  if (data.Response === 'True') {
    displayMovieResults(data.Search);
  } else {
    displayError("Movie Not found !!!");
  }
}


function displayMovieResults(results) {
  movieResults.innerHTML = results.map(result => 
    ` <div class="movie">
      <img src="${result.Poster}" alt="Movie Poster">
      <h2>${result.Title}</h2>
      <p>Year: ${result.Year}</p>
      <p>${result.Type}</p>
    </div> `);
}

function displayError() {
  movieResults.innerHTML = `<p class="error">Movie Not Found !!!</p>`;
}
