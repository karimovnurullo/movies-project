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
const genreForm = document.querySelector(".genre-form");
genreForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const name = genreForm.genreName.value;
    if (!name) {
        console.log("error");
    }
    else {
        try {
            let genre = {
                name
            };
            console.log(name);
            const response = yield fetch("https://pdp-movies-78.onrender.com/api/genres/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": `${token}`,
                },
                body: JSON.stringify(genre),
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
