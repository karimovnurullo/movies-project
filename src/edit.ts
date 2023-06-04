const editMovieForm = document.querySelector<HTMLFormElement>(".edit-movie-form")!;
const editGenreSelect = document.querySelector<HTMLSelectElement>(".edit-genre-select")!;
// const options = editGenreSelect.querySelectorAll<HTMLOptionElement>("");
(async function genres() {
  const res = await fetch("https://pdp-movies-78.onrender.com/api/genres/");
  const menus = await res.json();
  for (let i = 0; i < menus.length; i++) {
    const option = document.createElement("option");
    option.value = menus[i]._id;
    option.text = menus[i].name;
    option.className = "edit-option";
    editGenreSelect.appendChild(option);
  }
})();

let movieId = localStorage.getItem("movieId")!;
console.log(movieId);

(async function name() {
  const res = await fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`);
  const movie = await res.json();
  editMovieForm.titleName.value = movie.title;
  editGenreSelect.value = movie.genre._id;
  editMovieForm.numberInStock.value = movie.numberInStock;
  editMovieForm.rate.value = movie.dailyRentalRate;
})();

editMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let token = localStorage.getItem("token");
  const title = editMovieForm.titleName.value;
  const genreId = editMovieForm.genre.value;
  const numberInStock = parseInt(editMovieForm.numberInStock.value);
  const rate = parseInt(editMovieForm.rate.value);
  if (!title && !genreId && !numberInStock && !rate) {
    console.log("error");
  } else {
    try {
      let movie = {
        title,
        genreId,
        numberInStock,
        dailyRentalRate: rate,
      };
      console.log(title, genreId, numberInStock, rate);
      const response = await fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": `${token}`,
        },
        body: JSON.stringify(movie),
      });
      let data = await response.json();
      window.location.href = "/";
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  }
});
