const registerForm = document.querySelector<HTMLFormElement>(".register-form")!;
const registerSubmit =
  document.querySelector<HTMLButtonElement>(".register-submit")!;
const registerAlert =
  document.querySelector<HTMLDivElement>(".register-alert")!;

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = registerForm.email.value.trim();
  const emailAlert =
    registerForm.querySelector<HTMLDivElement>(".email-alert")!;
  const passwordAlert =
    registerForm.querySelector<HTMLDivElement>(".password-alert")!;
  const usernameAlert =
    registerForm.querySelector<HTMLDivElement>(".username-alert")!;
  const password = registerForm.password.value.trim();
  const name = registerForm.username.value.trim();

  if (!email && !password && !name) {
    registerAlert.classList.remove("d-none");
    setTimeout(() => registerAlert.classList.add("d-none"), 2500);
  } else if (!email) {
    emailAlert.classList.remove("d-none");
    registerAlert.classList.add("d-none");
    setTimeout(() => emailAlert.classList.add("d-none"), 2500);
  } else if (!password) {
    passwordAlert.classList.remove("d-none");
    setTimeout(() => passwordAlert.classList.add("d-none"), 2500);
    registerAlert.classList.add("d-none");
  } else if (!name) {
    usernameAlert.classList.remove("d-none");
    registerAlert.classList.add("d-none");
    setTimeout(() => usernameAlert.classList.add("d-none"), 2500);
  } else {
    let user = { name, email, password };
    try {
      const response = await fetch("https://pdp-movies-78.onrender.com/api/users/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error: any) {
      console.error(error.message);
    }

  }
});
