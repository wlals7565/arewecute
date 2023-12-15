document.addEventListener("click", function (event) {
  let clickedElementId = event.target.id;
  let fixButtonClicked = String(clickedElementId).includes("fixInfoButton");
  if (fixButtonClicked) {
    fixReview();
  }
});

let deleteReviewId = 0;

let petSitterId = 0;
let reviewId = 0;

document.addEventListener("click", function (event) {
  let clickedElementId = event.target.id;
  let modalClicked =
    String(clickedElementId).includes("fixReview") || String(clickedElementId).includes("deleteReview");
  if (modalClicked) {
    petSitterId = Number(String(clickedElementId).split(":")[2]);
    reviewId = Number(String(clickedElementId).split(":")[4]);
  }
  if (String(clickedElementId).includes("deleteReview")) {
    deleteReview();
  }
});

async function fixReview() {
  const comment = document.getElementById(`reviewComment${reviewId}`).value;
  const rate = document.getElementById(`reviewRate${reviewId}`).value; // 서버로 전송할 데이터 생성
  const reviewInfo = {
    rate,
    comment
  };

  // 서버로 데이터 전송
  fetch(`http://localhost:3000/api/reviews/${petSitterId}/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewInfo)
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.code === 200) {
        alert(`리뷰 수정에 성공하였습니다.`);
        window.location.href = "/html/mypage.html";
      } else {
        alert(`리뷰 수정에 실패하였습니다.`);
        window.location.href = "/html/mypage.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}

async function deleteReview() {
  // 서버로 데이터 전송
  fetch(`http://localhost:3000/api/reviews/${petSitterId}/${reviewId}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.code === 200) {
        alert(`리뷰 삭제에 성공하였습니다.`);
        window.location.href = "/html/mypage.html";
      } else {
        alert(`리뷰 삭제에 실패하였습니다.`);
        console.log(result);
        window.location.href = "/html/mypage.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}
