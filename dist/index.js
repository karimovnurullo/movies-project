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
const listGroupMenus = document.querySelector('.list-group');
for (const menu of menusList) {
    const li = document.createElement('li');
    li.classList.add("list-group-item");
    li.textContent = menu.name;
    listGroupMenus.appendChild(li);
    li.classList.remove("active");
    li.addEventListener('click', (e) => {
        const allLi = document.querySelectorAll('.list-group-item');
        allLi.forEach(item => item.classList.remove('active'));
        e.target.classList.add("active");
    });
}
const manuBtns = document.querySelectorAll('.list-group-item');
