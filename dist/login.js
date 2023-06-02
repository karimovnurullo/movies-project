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
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    console.log("Submit");
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    if (!email && !password) {
        console.log("error");
    }
    else {
        try {
            let user = { email, password };
            const response = yield fetch("https://pdp-movies-78.onrender.com/api/auth/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const { data } = yield response.json();
            console.log(data);
        }
        catch (error) {
            console.error(error.message);
        }
    }
}));
