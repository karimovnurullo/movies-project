const addMovieForm = document.querySelector<HTMLFormElement>(".add-movie-form")!;
const genreSelect = document.querySelector<HTMLSelectElement>(".genre-select")!;

(async function name() {
  const res = await fetch("https://pdp-movies-78.onrender.com/api/genres/");
  const menus = await res.json();
  for (let i = 0; i < menus.length; i++) {   
    const option = document.createElement("option");
    option.value = menus[i]._id;
    option.text = menus[i].name;
    genreSelect.appendChild(option);
  }
})();

addMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let token = localStorage.getItem("token");
  const title = addMovieForm.titlee.value;
  const genreValue = addMovieForm.genre.value;
  const numberInStock = parseInt(addMovieForm.numberInStock.value);
  const rate = parseInt(addMovieForm.rate.value);
  if (!title && !genreValue && !numberInStock && !rate) {
    console.log("error");
  } else {
    try {
      // let manuName = manus.find((menu) => menu._id === genreValue);

      let movie = {
        title,
        genreId: genreValue,
        numberInStock,
        dailyRentalRate: rate,
      };

      console.log(title, genreValue, numberInStock, rate);
      const response = await fetch("https://pdp-movies-78.onrender.com/api/movies", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": `${token}`,
        },
        body: JSON.stringify(movie),
      });
      let data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  }
});
