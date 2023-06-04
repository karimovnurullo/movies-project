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
const registerForm = document.querySelector(".register-form");
const registerSubmit = document.querySelector(".register-submit");
const registerAlert = document.querySelector(".register-alert");
registerForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = registerForm.email.value.trim();
    const emailAlert = registerForm.querySelector(".email-alert");
    const passwordAlert = registerForm.querySelector(".password-alert");
    const usernameAlert = registerForm.querySelector(".username-alert");
    const password = registerForm.password.value.trim();
    const name = registerForm.username.value.trim();
    if (!email && !password && !name) {
        registerAlert.classList.remove("d-none");
        setTimeout(() => registerAlert.classList.add("d-none"), 2500);
    }
    else if (!email) {
        emailAlert.classList.remove("d-none");
        registerAlert.classList.add("d-none");
        setTimeout(() => emailAlert.classList.add("d-none"), 2500);
    }
    else if (!password) {
        passwordAlert.classList.remove("d-none");
        setTimeout(() => passwordAlert.classList.add("d-none"), 2500);
        registerAlert.classList.add("d-none");
    }
    else if (!name) {
        usernameAlert.classList.remove("d-none");
        registerAlert.classList.add("d-none");
        setTimeout(() => usernameAlert.classList.add("d-none"), 2500);
    }
    else {
        let user = { name, email, password };
        try {
            const res = yield fetch("https://pdp-movies-78.onrender.com/api/users/");
            const response = yield fetch("https://pdp-movies-78.onrender.com/api/users/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const data = yield response.text();
                console.log(data);
                localStorage.setItem("token", data);
                window.location.href = `/`;
            }
            else {
                throw new Error("Request failed with status: " + response.status);
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }
}));
