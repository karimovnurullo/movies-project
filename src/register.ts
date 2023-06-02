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
  const username = registerForm.userName.value.trim();

  if (!email && !password && !username) {
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
  } else if (!username) {
    usernameAlert.classList.remove("d-none");
    registerAlert.classList.add("d-none");
    setTimeout(() => usernameAlert.classList.add("d-none"), 2500);
  } else {
    try {
      let user = { email, password, username };
      const response = await fetch("https://pdp-movies-78.onrender.com/api/auth/",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
});
