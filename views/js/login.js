import isLoggedIn from "./pet-sitter.js";

// 로그인 버튼 요소를 가져옵니다.
const loginButton = document.getElementById("loginButton");
const loginDiv = document.getElementById("loginDiv");

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
        window.location.href = "/views/html/index-pet-sitter.html";
        isLoggedIn = true;
      } else {
        alert(`로그인에 실패하였습니다.`);
        window.location.href = "/views/html/index-pet-sitter.html";
      }
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
    });
}

// 로그인 상태에 따라 로그인 버튼의 표시 여부를 업데이트하는 함수
function updateLoginButton() {
  if (isLoggedIn) {
    // 로그인 상태인 경우, 로그인 버튼을 숨깁니다.
    loginDiv.style.display = "none";
  } else {
    // 로그인 상태가 아닌 경우, 로그인 버튼을 표시합니다.
    loginDiv.style.display = "block";
  }
}

updateLoginButton(isLoggedIn); // 로그인 버튼의 표시 여부를 업데이트합니다.

loginButton.addEventListener("click", () => {
  login();
});
