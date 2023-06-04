const editMovieForm = document.querySelector<HTMLFormElement>(".edit-movie-form")!;
const editGenreSelect = document.querySelector<HTMLSelectElement>(".edit-genre-select")!;


(async function genres() {
  const res = await fetch("https://pdp-movies-78.onrender.com/api/genres/");
  const menus = await res.json();
  for (let i = 0; i < menus.length; i++) {
    const option = document.createElement("option");
    option.value = menus[i]._id;
    option.text = menus[i].name;
    genreSelect.appendChild(option);
  }
})();

(async function name() {
  let movieId = localStorage.getItem("movieId")!;
  const res = await fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`);
  const movie = await res.json();
  editMovieForm.titleName.value = movie.title;
  editGenreSelect.value = movie._id;
  editMovieForm.numberInStock.value = movie.numberInStock;
  editMovieForm.rate.value = movie.dailyRentalRate;
  
})();

editMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let token = localStorage.getItem("token");
  const title = editMovieForm.titleName.value;
  const genreValue = editMovieForm.genre.value;
  const numberInStock = parseInt(editMovieForm.numberInStock.value);
  const rate = parseInt(editMovieForm.rate.value);
  if (!title && !genreValue && !numberInStock && !rate) {
    console.log("error");
  } else {
    try {
      let movie = {
        title,
        genreId: genreValue,
        numberInStock,
        dailyRentalRate: rate,
      };
      console.log(title, genreValue, numberInStock, rate);
      const response = await fetch(`https://pdp-movies-78.onrender.com/api/movies`, {
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
