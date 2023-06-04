const listGroupMenus = document.querySelector<HTMLUListElement>(".list-group")!;
const tbody = document.querySelector<HTMLTableElement>(".tbody")!;
const loginBtn = document.querySelectorAll<HTMLLIElement>(".login-btn")!;
const homeLoginBtn = document.querySelector<HTMLLIElement>(".home-login-btn")!;
const registerBtn = document.querySelectorAll<HTMLButtonElement>(".register-btn")!;
const showingNum = document.querySelector<HTMLSpanElement>(".showing-num")!;
const searchInput = document.querySelector<HTMLInputElement>(".search")!;
const pagination = document.querySelector<HTMLDivElement>(".pagination")!;
const sortTitle = document.querySelector<HTMLTableElement>(".title-sort")!;
const sortGenre = document.querySelector<HTMLTableElement>(".genre-sort")!;
const sortStock = document.querySelector<HTMLTableElement>(".stock-sort")!;
const sortRate = document.querySelector<HTMLTableElement>(".rate-sort")!;
const homeUserName = document.querySelector<HTMLButtonElement>(".home-user-name")!;
const saveMovieBtn = document.querySelector<HTMLButtonElement>(".save-movie-btn")!;
const logoutBtn = document.querySelector<HTMLLIElement>(".logout-btn")!;
const homeRegisterBtn = document.querySelector<HTMLLIElement>(".home-register-btn")!;
const addMovieForm = document.querySelector<HTMLFormElement>(".add-movie-form")!;
const genreSelect = document.querySelector<HTMLSelectElement>(".genre-select")!;

async function getMenus() {
  const res = await fetch("https://pdp-movies-78.onrender.com/api/genres/");
  const data = await res.json();
  return data;
}
async function getMovies() {
  const res = await fetch("https://pdp-movies-78.onrender.com/api/movies/");
  const data = await res.json();
  return data;
}

async function getUser() {
  let token = localStorage.getItem("token");
  if (token) {
    const res = await fetch("https://pdp-movies-78.onrender.com/api/users/me", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
    const data = await res.json();
    homeUserName.textContent = data.name;
    homeLoginBtn.classList.add("hide");
    logoutBtn.classList.add("show");
    logoutBtn.classList.add("show");
    homeRegisterBtn.classList.add("hide");
  }
}

getMenus().then((menus) => {
  for (let i = 0; i < menus.length; i++) {
    const option = document.createElement("option");
    option.value = menus[i]._id;
    option.text = menus[i].name;
    genreSelect.appendChild(option);
  }
});

window.addEventListener("load", () => {});
getUser();
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
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
    let value = (e.target as HTMLInputElement).value;
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
let filteredMovies: any[] = [];

async function showMovies() {
  const menus = await getMenus();
  const movies = await getMovies();
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
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
}

function activeMenu(e: Event) {
  const allLi = document.querySelectorAll(".list-group-item");
  allLi.forEach((item) => item.classList.remove("active"));
  (e.target as HTMLLIElement).classList.add("active");
}

function generateRow(movie: any) {
  const rowData = [movie.title, movie.genre.name, movie.numberInStock.toString(), movie.dailyRentalRate.toString()];
  const tr = document.createElement("tr");
  rowData.forEach((columnData) => {
    const td = document.createElement("td");
    td.textContent = columnData;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
}

addMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let manus = await getMenus();
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
