"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const editMovieForm = document.querySelector(".edit-movie-form");
const editGenreSelect = document.querySelector(".edit-genre-select");
(function genres() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://pdp-movies-78.onrender.com/api/genres/");
        const menus = yield res.json();
        for (let i = 0; i < menus.length; i++) {
            const option = document.createElement("option");
            option.value = menus[i]._id;
            option.text = menus[i].name;
            genreSelect.appendChild(option);
        }
    });
})();
(function name() {
    return __awaiter(this, void 0, void 0, function* () {
        let movieId = localStorage.getItem("movieId");
        const res = yield fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`);
        const movie = yield res.json();
        editMovieForm.titleName.value = movie.title;
        editGenreSelect.value = movie._id;
        editMovieForm.numberInStock.value = movie.numberInStock;
        editMovieForm.rate.value = movie.dailyRentalRate;
    });
})();
editMovieForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const title = editMovieForm.titleName.value;
    const genreValue = editMovieForm.genre.value;
    const numberInStock = parseInt(editMovieForm.numberInStock.value);
    const rate = parseInt(editMovieForm.rate.value);
    if (!title && !genreValue && !numberInStock && !rate) {
        console.log("error");
    }
    else {
        try {
            let movie = {
                title,
                genreId: genreValue,
                numberInStock,
                dailyRentalRate: rate,
            };
            console.log(title, genreValue, numberInStock, rate);
            const response = yield fetch(`https://pdp-movies-78.onrender.com/api/movies`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": `${token}`,
                },
                body: JSON.stringify(movie),
            });
            let data = yield response.json();
            window.location.href = "/";
            console.log(data);
        }
        catch (error) {
            console.error(error.message);
        }
    }
}));
