const signupButton = document.getElementById("signupButton");

async function signup() {
  const email = document.getElementById("signupInputEmail").value;
  const password = document.getElementById("signupInputPassword").value;
  const confirmPassword = document.getElementById("signupInputConfirmPassword").value;
  const name = document.getElementById("signupInputUsername").value;
  const region = document.getElementById("signupInputRegion").value;

  // 서버로 전송할 데이터 생성
  const userInfo = {
    email,
    password,
    confirmPassword,
    name,
    region
  };

  // 서버로 데이터 전송
  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  })
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        alert(`회원가입에 성공하였습니다.`);
        window.location.href = "/html/index-pet-sitter.html";
      } else {
        alert(`회원가입에 실패하였습니다.`);
        window.location.href = "/html/index-pet-sitter.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}

signupButton.addEventListener("click", () => {
  signup();
});
