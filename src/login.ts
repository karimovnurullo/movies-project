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
      const user = { email, password };
      const response = await fetch("https://pdp-movies-78.onrender.com/api/auth/", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please try again.");
      }

      const data = await response.json();
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
    }
  }
});
