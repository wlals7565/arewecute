// 로그인 버튼 요소를 가져옵니다.
const loginButton = document.getElementById("loginButton");

async function login() {
  const email = document.getElementById("loginInputEmail").value;
  const password = document.getElementById("loginInputPassword").value;
  // 서버로 전송할 데이터 생성
  const userInput = {
    email: email,
    password: password
  };

  // 서버로 데이터 전송
  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInput)
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.id) {
        alert(`로그인에 성공하였습니다.`);
        window.location.href = "/html/index-pet-sitter.html";
        isLoggedIn = true;
      } else {
        alert(`로그인에 실패하였습니다.`);
        window.location.href = "/html/index-pet-sitter.html";
      }
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
    });
}

loginButton.addEventListener("click", () => {
  login();
});
