const loginDiv = document.getElementById("loginDiv");

const reservationButton = document.getElementById("reservationButton");
console.log(reservationButton);

let petSitterId = "0";

document.addEventListener("click", function (event) {
  let clickedElementId = event.target.className;
  let isNotLoggedIn = Boolean(loginDiv.style.display === "block");
  let modalClicked = String(clickedElementId).includes("petSitterId");
  if (isNotLoggedIn && modalClicked) {
    alert(`로그인이 필요한 서비스입니다.`);
    window.location.href = "/html/index-pet-sitter.html";
  } else if (modalClicked) {
    petSitterId = Number(String(clickedElementId).split(":")[1]);
  }
});

async function reservation() {
  const date = document.getElementById("reservationInputDate").value;
  const animal = document.getElementById("reservationInputAnimal").value;
  const comment = document.getElementById("reservationInputComment").value;
  // 서버로 전송할 데이터 생성
  const reservationInfo = {
    petSitterId,
    date,
    animal,
    comment
  };

  // 서버로 데이터 전송
  fetch("http://localhost:3000/api/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reservationInfo)
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        alert(`예약에 성공하였습니다.`);
        window.location.href = "/html/index-pet-sitter.html";
      } else {
        alert(`예약에 실패하였습니다.`);
        window.location.href = "/html/index-pet-sitter.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}

reservationButton.addEventListener("click", () => {
  reservation();
});
