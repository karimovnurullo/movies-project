"use strict";
const menusList = [
    {
        name: "Comedy",
        movies: [
            { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
            { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
            { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
        ],
    },
    {
        name: "Action",
        movies: [
            { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
            { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
            { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
        ],
    },
    {
        name: "Romance",
        movies: [
            { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
            { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
            { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
        ],
    },
    {
        name: "Thriller",
        movies: [
            { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
            { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
            { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
        ],
    },
];
const listGroupMenus = document.querySelector(".list-group");
const tbody = document.querySelector(".tbody");
const loginBtn = document.querySelectorAll(".login-btn");
const registerBtn = document.querySelectorAll(".register-btn");
const liAll = document.createElement("li");
liAll.classList.add("list-group-item", "active");
liAll.textContent = "All genres";
listGroupMenus.appendChild(liAll);
liAll.addEventListener("click", () => {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    const allLi = document.querySelectorAll(".list-group-item");
    allLi.forEach((item) => item.classList.remove("active"));
    liAll.classList.add("active");
    let counter = 0;
    for (const menu of menusList) {
        for (const movie of menu.movies) {
            counter++;
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            td1.textContent = movie.title;
            td2.textContent = menu.name;
            td3.textContent = movie.numberInStock.toString();
            td4.textContent = movie.dailyRentalRate.toString();
            tr.append(td1, td2, td3, td4);
            tbody.appendChild(tr);
        }
    }
    console.log(counter);
});
for (const menu of menusList) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = menu.name;
    listGroupMenus.append(li);
    li.classList.remove("active");
    li.addEventListener("click", (e) => {
        const allLi = document.querySelectorAll(".list-group-item");
        allLi.forEach((item) => item.classList.remove("active"));
        e.target.classList.add("active");
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        let counter = 0;
        for (const movie of menu.movies) {
            counter++;
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            td1.textContent = movie.title;
            td2.textContent = menu.name;
            td3.textContent = movie.numberInStock.toString();
            td4.textContent = movie.dailyRentalRate.toString();
            tr.append(td1, td2, td3, td4);
            tbody.appendChild(tr);
        }
        console.log(counter);
    });
}
const manuBtns = document.querySelectorAll(".list-group-item");
loginBtn.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = "login";
    });
});
registerBtn.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = "register";
    });
});
