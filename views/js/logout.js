window.signout = signout;
async function signout() {
  fetch("http://localhost:3000/api/auth/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.message) {
        alert(`${result.message}`);
        window.location.href = "/views/html/index-pet-sitter.html";
      } else {
        alert(`${result.errorMessage}`);
        window.location.href = "/views/html/index-pet-sitter.html";
      }
    })
    .catch((error) => {
      console.error("서버에러:", error);
    });
}
