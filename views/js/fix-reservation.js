document.addEventListener("click", function (event) {
  let clickedElementId = event.target.id;
  let fixButtonClicked = String(clickedElementId).includes("fixReservationButton");
  if (fixButtonClicked) {
    fixReservation();
  }
});

let reservationId = 0;
let petSitterId = 0;

document.addEventListener("click", function (event) {
  let clickedElementId = event.target.id;
  let modalClicked =
    String(clickedElementId).includes("fixReservation") || String(clickedElementId).includes("deleteReservation");
  if (modalClicked) {
    petSitterId = Number(String(clickedElementId).split(":")[2]);
    reservationId = Number(String(clickedElementId).split(":")[4]);
    console.log(petSitterId, reservationId);
  } else {
    console.log(petSitterId, reservationId);
  }
  if (String(clickedElementId).includes("deleteReservation")) {
    deleteReservation();
  }
});

async function fixReservation() {
  const date = document.getElementById(`InputDate${reservationId}`).value;
  const animal = document.getElementById(`InputAnimal${reservationId}`).value;
  const comment = document.getElementById(`InputComment${reservationId}`).value;
  // 서버로 전송할 데이터 생성
  const reservationInfo = {
    petSitterId,
    date,
    animal,
    comment
  };

  // 서버로 데이터 전송
  fetch(`http://localhost:3000/api/reservation/${reservationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reservationInfo)
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success === true) {
        alert(`예약 수정에 성공하였습니다.`);
        window.location.href = "/html/mypage.html";
      } else {
        alert(`예약 수정에 실패하였습니다.`);
        window.location.href = "/html/mypage.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}

async function deleteReservation() {
  // 서버로 데이터 전송
  fetch(`http://localhost:3000/api/reservation/${reservationId}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success === true) {
        alert(`예약 삭제에 성공하였습니다.`);
        window.location.href = "/html/mypage.html";
      } else {
        alert(`예약 삭제에 실패하였습니다.`);
        window.location.href = "/html/mypage.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}
