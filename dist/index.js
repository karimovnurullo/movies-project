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
const listGroupMenus = document.querySelector(".list-group");
const tbody = document.querySelector(".tbody");
const loginBtn = document.querySelectorAll(".login-btn");
const homeLoginBtn = document.querySelector(".home-login-btn");
const registerBtn = document.querySelectorAll(".register-btn");
const showingNum = document.querySelector(".showing-num");
const searchInput = document.querySelector(".search");
const pagination = document.querySelector(".pagination");
const sortTitle = document.querySelector(".title-sort");
const sortGenre = document.querySelector(".genre-sort");
const sortStock = document.querySelector(".stock-sort");
const sortRate = document.querySelector(".rate-sort");
const homeUserName = document.querySelector(".home-user-name");
const saveMovieBtn = document.querySelector(".save-movie-btn");
const logoutBtn = document.querySelector(".logout-btn");
const homeRegisterBtn = document.querySelector(".home-register-btn");
const addNewMovie = document.querySelector("#add-new-movie");
const addNewGenre = document.querySelector("#add-new-genre");
const tds = document.querySelectorAll(".cell");
function getMenus() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://pdp-movies-78.onrender.com/api/genres/");
        const data = yield res.json();
        return data;
    });
}
function getMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://pdp-movies-78.onrender.com/api/movies/");
        const data = yield res.json();
        return data;
    });
}
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let token = localStorage.getItem("token");
        if (token) {
            const res = yield fetch("https://pdp-movies-78.onrender.com/api/users/me", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-auth-token": `${token}`,
                },
            });
            const data = yield res.json();
            homeUserName.textContent = data.name;
            homeLoginBtn.classList.add("hide");
            logoutBtn.classList.add("show");
            homeRegisterBtn.classList.add("hide");
            addNewMovie.classList.add("show");
            addNewGenre.classList.add("show");
        }
    });
}
window.addEventListener("load", () => { });
getUser();
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
    homeUserName.textContent = "";
    localStorage.removeItem("token");
    homeLoginBtn.classList.remove("hide");
    logoutBtn.classList.remove("show");
    homeRegisterBtn.classList.remove("hide");
    addNewMovie.classList.remove("show");
    window.location.href = "/";
});
getMovies().then((movies) => {
    const liAll = document.createElement("li");
    liAll.classList.add("list-group-item", "active");
    liAll.textContent = "All genres";
    listGroupMenus.appendChild(liAll);
    let sortmuvies = movies.sort((a, b) => a.title.localeCompare(b.title));
    liAll.addEventListener("click", (e) => {
        clearTable();
        activeMenu(e);
        let counter = 0;
        for (const movie of sortmuvies) {
            counter++;
            generateRow(movie);
        }
        showingNum.textContent = counter.toString();
    });
    //=========================  SEARCH =================
    searchInput.addEventListener("input", (e) => {
        let value = e.target.value;
        clearTable();
        let count = 0;
        for (let movie of movies) {
            if (movie.title.toLowerCase().includes(value.toLowerCase())) {
                count++;
                generateRow(movie);
            }
        }
        showingNum.textContent = count.toString();
    });
});
const itemsPerPage = 4;
let currentPage = 1;
let filteredMovies = [];
function showMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const menus = yield getMenus();
        const movies = yield getMovies();
        let sortMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
        for (const menu of menus) {
            const newArr = sortMovies.filter((item) => menu.name === item.genre.name);
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = menu.name;
            listGroupMenus.append(li);
            li.addEventListener("click", (e) => {
                activeMenu(e);
                filteredMovies = newArr;
                currentPage = 1;
                renderMovies();
                updatePagination();
            });
        }
        filteredMovies = sortMovies;
        renderMovies();
        updatePagination();
    });
}
function renderMovies() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
    tbody.innerHTML = "";
    for (const movie of paginatedMovies) {
        generateRow(movie);
    }
    showingNum.textContent = paginatedMovies.length.toString();
}
function updatePagination() {
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    pagination.innerHTML = "";
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i.toString();
        button.classList.add("btn", "pagination-button");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            button.classList.add("active");
            currentPage = i;
            renderMovies();
            updatePagination();
        });
        pagination.appendChild(button);
    }
}
showMovies();
loginBtn.forEach((element) => element.addEventListener("click", () => (window.location.href = "login")));
registerBtn.forEach((element) => element.addEventListener("click", () => (window.location.href = "register")));
// ========================== Functions =================
function clearTable() {
    while (tbody.firstChild)
        tbody.removeChild(tbody.firstChild);
}
function activeMenu(e) {
    const allLi = document.querySelectorAll(".list-group-item");
    allLi.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
}
function generateRow(movie) {
    let token1 = localStorage.getItem("token");
    const rowData = [movie.title, movie.genre.name, movie.numberInStock.toString(), movie.dailyRentalRate.toString(), ""];
    const tr = document.createElement("tr");
    rowData.forEach((columnData, idx) => {
        const td = document.createElement("td");
        td.textContent = columnData;
        td.className = "cell";
        tr.appendChild(td);
        if (idx === 0) {
            td.innerHTML = `<a>${rowData[0]}</a>`;
            if (token1) {
                td.innerHTML = `<a href="edit">${rowData[0]}</a>`;
                td.addEventListener("click", () => {
                    localStorage.setItem("movieId", `${movie._id}`);
                });
            }
            else {
                td.innerHTML = `<a href="login">${rowData[0]}</a>`;
            }
        }
        if (idx === rowData.length - 1) {
            td.innerHTML = `<i class="fa-regular fa-heart" style="color: #000000;"></i>`;
            let icon = td.querySelector(".fa-heart");
            icon.addEventListener("click", (e) => {
                const heartIcon = e.target;
                heartIcon === null || heartIcon === void 0 ? void 0 : heartIcon.classList.toggle("fa-solid");
            });
        }
    });
    tbody.appendChild(tr);
}
addNewMovie.addEventListener("click", () => {
    window.location.href = "new";
});
