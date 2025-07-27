const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Create a single row to hold all movie columns
const row = document.createElement("div");
row.setAttribute("class", "row");
main.appendChild(row);

returnMovies(APILINK);
function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results);
      // Clear any existing content
      const row = document.querySelector('.row');
      row.innerHTML = '';
      
      data.results.forEach((element) => {
        const column = document.createElement("div");
        column.setAttribute("class", "column");
        
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        
        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("alt", element.title);
        
        const title = document.createElement("h3");
        title.setAttribute("class", "title");
        
        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Add Review</a>`;
        image.src = IMG_PATH + element.poster_path;
        
        card.appendChild(image);
        card.appendChild(title);
        column.appendChild(card);
        row.appendChild(column);
      });
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
