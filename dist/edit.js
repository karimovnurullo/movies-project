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
const deleteMovieBtn = document.querySelector(".delete-movie-btn");
(function genres() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://pdp-movies-78.onrender.com/api/genres/");
        const menus = yield res.json();
        for (let i = 0; i < menus.length; i++) {
            const option = document.createElement("option");
            option.value = menus[i]._id;
            option.text = menus[i].name;
            option.className = "edit-option";
            editGenreSelect.appendChild(option);
        }
    });
})();
let movieId = localStorage.getItem("movieId");
console.log(movieId);
(function name() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`);
        const movie = yield res.json();
        editMovieForm.titleName.value = movie.title;
        editGenreSelect.value = movie.genre._id;
        editMovieForm.numberInStock.value = movie.numberInStock;
        editMovieForm.rate.value = movie.dailyRentalRate;
    });
})();
let token = localStorage.getItem("token");
editMovieForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const title = editMovieForm.titleName.value;
    const genreId = editMovieForm.genre.value;
    const numberInStock = parseInt(editMovieForm.numberInStock.value);
    const rate = parseInt(editMovieForm.rate.value);
    if (!title && !genreId && !numberInStock && !rate) {
        console.log("error");
    }
    else {
        try {
            let movie = {
                title,
                genreId,
                numberInStock,
                dailyRentalRate: rate,
            };
            console.log(title, genreId, numberInStock, rate);
            const response = yield fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`, {
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
deleteMovieBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://pdp-movies-78.onrender.com/api/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "x-auth-token": `${token}`,
        },
    });
    const data = yield response.json();
    console.log(data);
}));
