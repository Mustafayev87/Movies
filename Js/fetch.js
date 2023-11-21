const movieDetail = document.getElementById("movieDetail");
const movieSearch = document.getElementById("movieSearch");
console.log(movieDetail, movieSearch);
movieSearch.addEventListener("keydown", function (x) {
  if (x.key === "Enter") {
    const movieTitle = this.value;
    // getMovie(movieTitle);
    getMovieSearch(movieTitle);
    this.value = "";
  }
});

async function getMovie(title) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a407a7b3&t=${title}`
    );

    const data = await response.json();

    renderDetail(data);
  } catch (err) {
    console.log("err", err);
  }
}

async function getMovieSearch(title) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a407a7b3&s=${title}&limit=1`
    );

    const data = await response.json();

    renderSearchResult(data.Search);
  } catch (err) {
    console.log("err", err);
  }
}

function renderDetail(movie) {
  console.log(movie);

  movieDetail.innerHTML = `<div class="d-flex gap-5 my-5 px-5">
      <img height="300" style="object-fit: cover"  src="${movie.Poster}" />
  
      <div>
      <h1>${movie.Title}</h1>
      <ul>
        <li>Country: ${movie.Country}</li>
        <li>Awards: ${
          movie.Awards === "N/A" ? "Sistemde yoxdur" : movie.Awards
        }</li>
        <li>Min: ${movie.Runtime}</li>
        <li>Year: ${movie.Year}</li>
        <li class="text-warning h3">${movie.imdbRating}</li>
      </ul>
  
      <ul>
      ${movie.Ratings.map(
        (rait) =>
          `<li class="text-danger h6">${rait.Source}: ${rait.Value} </li>`
      ).join("")}
      </ul>
      </div>
    </div>`;
}

function renderSearchResult(movies) {
  console.log(movies);

  movieDetail.innerHTML = movies
    ?.map(
      (movie) => `<div class="d-flex gap-5 my-5 border shadow">
        <img width="400" height="300" style="object-fit: cover"  src="${movie.Poster}" />
    
        <div class="p-5">
        <h1>${movie.Title}</h1>
        <h2>${movie.Type}</h2>
        <h2>${movie.Year}</h2>
        </div>
      </div>`
    )
    .join("");
}

const myPr = new Promise((resolve, reject) => {
  resolve({ message: "OK", data: "HEy" });
});
