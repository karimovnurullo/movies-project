const loginForm = document.querySelector<HTMLFormElement>(".login-form")!;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit");

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email && !password) {
    console.log("error");
  } else {
    try {
      let user = { email, password };
      const response = await fetch(
        "https://pdp-movies-78.onrender.com/api/auth/",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const { data } = await response.json();
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  }
});
