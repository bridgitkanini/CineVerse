const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results);
      
      // Clear the main container first
      main.innerHTML = '';
      
      // Create a single row to hold all columns
      let currentRow = document.createElement("div");
      currentRow.setAttribute("class", "row");
      
      data.results.forEach((element, index) => {
        // Create a new row for every 4 movies
        if (index > 0 && index % 4 === 0) {
          main.appendChild(currentRow);
          currentRow = document.createElement("div");
          currentRow.setAttribute("class", "row");
        }

        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card");

        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("alt", element.title);

        const title = document.createElement("h3");
        title.setAttribute("class", "movie-title");

        const center = document.createElement("center");

        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${encodeURIComponent(element.title)}">Add Review</a>`;
        image.src = element.poster_path ? IMG_PATH + element.poster_path : 'https://via.placeholder.com/300x450?text=No+Poster';
        
        // Add a fallback image in case the poster fails to load
        image.onerror = function() {
          this.src = 'https://via.placeholder.com/300x450?text=No+Poster';
        };

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        currentRow.appendChild(div_column);
      });
      
      // Append the last row if it has any content
      if (currentRow.children.length > 0) {
        main.appendChild(currentRow);
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});
