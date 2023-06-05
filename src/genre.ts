const genreForm = document.querySelector<HTMLFormElement>(".genre-form")!;

genreForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let token = localStorage.getItem("token");
  const name = genreForm.genreName.value;
  if (!name) {
    console.log("error");
  } else {
    try {
      let genre = {
        name
      };
      console.log(name);
      const response = await fetch("https://pdp-movies-78.onrender.com/api/genres/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": `${token}`,
        },
        body: JSON.stringify(genre),
      });
      let data = await response.json();
    //   window.location.href = "/";
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  }
});