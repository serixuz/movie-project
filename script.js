
const movies = [
  { id: 1, title: "Interstellar", genre: "ფანტასტიკა", year: 2014, poster: "images/interstellar.jpg" },
  { id: 2, title: "The Matrix", genre: "ფანტასტიკა", year: 1999, poster: "images/the-matrix.jpg" },
  { id: 3, title: "Inception", genre: "ფანტასტიკა", year: 2010, poster: "images/inception.jpg" },
  { id: 4, title: "Coco", genre: "ანიმაცია", year: 2017, poster: "images/coco.jpg" },
  { id: 5, title: "WALL-E", genre: "ანიმაცია", year: 2008, poster: "images/wall-e.jpg" },
  { id: 6, title: "Ratatouille", genre: "ანიმაცია", year: 2007, poster: "images/ratatouille.jpg" },
  { id: 7, title: "The Truman Show", genre: "დრამა", year: 1998, poster: "images/the-truman-show.jpg" },
  { id: 8, title: "Whiplash", genre: "დრამა", year: 2014, poster: "images/whiplash.jpg" },
  { id: 9, title: "The Green Mile", genre: "დრამა", year: 1999, poster: "images/the-green-mile.jpg" }
];

let favorites = [];


const moviesContainer = document.querySelector("#movies");
const searchInput = document.querySelector("#search");
const genreSelect = document.querySelector("#genre");
const yearSelect = document.querySelector("#year");
const favoritesList = document.querySelector("#favorites-list");
const count = document.querySelector("#count");

// 3. Выводим карточки из переданного массива.
function renderMovies(list) {
  moviesContainer.innerHTML = "";

  if (list.length === 0) {
    moviesContainer.innerHTML = "<p>ფილმი ვერ მოიძებნა.</p>";
    return;
  }

  list.forEach(function (movie) {
    const isFavorite = favorites.some(function (item) {
      return item.id === movie.id;
    });

    moviesContainer.innerHTML += `
      <article class="card">
        <img class="poster" src="${movie.poster}" alt="${movie.title} poster" width="500" height="750" loading="lazy">
        <h3>${movie.title}</h3>
        <p>${movie.genre} · ${movie.year}</p>
        <button onclick="addFavorite(${movie.id})" ${isFavorite ? "disabled" : ""}>
          ${isFavorite ? "დამატებულია" : "ფავორიტებში"}
        </button>
      </article>
    `;
  });
}

function filterMovies() {
  const search = searchInput.value.toLowerCase().trim();
  const genre = genreSelect.value;
  const year = yearSelect.value;

  const filtered = movies.filter(function (movie) {
    const matchesTitle = movie.title.toLowerCase().includes(search);
    const matchesGenre = genre === "all" || movie.genre === genre;
    const matchesYear = year === "all" ||
      (year === "old" && movie.year < 2010) ||
      (year === "new" && movie.year >= 2010);

    return matchesTitle && matchesGenre && matchesYear;
  });

  renderMovies(filtered);
}

function addFavorite(id) {
  const alreadyAdded = favorites.some(function (movie) {
    return movie.id === id;
  });
  if (alreadyAdded) return;

  const movie = movies.find(function (movie) {
    return movie.id === id;
  });

  favorites.push(movie);
  renderFavorites();
  filterMovies();
}

function renderFavorites() {
  favoritesList.innerHTML = "";
  count.textContent = favorites.length;

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<li>ჯერ ფავორიტები არ გაქვს.</li>";
    return;
  }

  favorites.forEach(function (movie) {
    favoritesList.innerHTML += `
      <li>${movie.title}
        <button onclick="removeFavorite(${movie.id})">წაშლა</button>
      </li>
    `;
  });
}

function removeFavorite(id) {
  favorites = favorites.filter(function (movie) {
    return movie.id !== id;
  });
  renderFavorites();
  filterMovies();
}

searchInput.addEventListener("input", filterMovies);
genreSelect.addEventListener("change", filterMovies);
yearSelect.addEventListener("change", filterMovies);

renderMovies(movies);
renderFavorites();
