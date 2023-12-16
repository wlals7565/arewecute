export const generateMyInfoModals = async (myReservations) => {
  const cardList = document.querySelector(".wrapMyInfoModal");
  cardList.innerHTML = myInfo
    .map(
      (user) => `
      <div class="modal fade" id="myInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <form class="auth-wrapper">
        <div class="text-center">
          <h3 class="mb-3 font-weight-normal"><strong>회원정보수정</strong></h3>
        </div>
        <div class="m-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="fixInputPassword">
        </div>
        <div class="m-3">
          <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="fixInputConfirmPassword">
        </div>
        <div class="m-3">
          <label for="exampleUserName" class="form-label">Username</label>
          <input type="text" class="form-control" id="fixInputUsername" value="${user.name}" aria-describedby="nameHelp">
        </div>
        <div class="m-3">
          <label for="exampleRegion" class="form-label">Region</label>
          <input type="text" class="form-control" id="fixInputRegion" value="${user.region}" aria-describedby="regionHelp">
        </div>
        <div class="m-3">
          <label for="formFile" class="form-label">Profile Image(부가기능)</label>
          <input class="form-control" type="file" id="formFile">
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <button type="submit" class="btn btn-outline-dark m-3">뒤로가기</button>
          </div>
          <div>
            <button type="submit" id="fixMyInfoButton" class="btn btn-outline-dark m-3">수정하기</button>
          </div>
        </div>
      </form>
        </div>
      </div>
    </div>`
    )
    .join("");
};

async function fetchMyInfo() {
  const response = await fetch("http://localhost:3000/api/users/me");
  const responseData = await response.json();
  const cards = [responseData.data];

  return cards;
}

const myInfo = await fetchMyInfo();
generateMyInfoModals(myInfo);

const fixInfoButton = document.getElementById("fixMyInfoButton");

async function fixInfo() {
  const password = document.getElementById("fixInputPassword").value;
  const confirmPassword = document.getElementById("fixInputConfirmPassword").value;
  const name = document.getElementById("fixInputUsername").value;
  const region = document.getElementById("fixInputRegion").value;
  console.log(password, confirmPassword, name, region);
  // 서버로 전송할 데이터 생성
  const userInfo = {
    password,
    confirmPassword,
    name,
    region
  };

  // 서버로 데이터 전송
  fetch("http://localhost:3000/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        alert(`회원정보수정에 성공하였습니다.`);
        window.location.href = "/html/mypage.html";
      } else {
        alert(`회원정보수정에 실패하였습니다.`);
        window.location.href = "/html/mypage.html";
      }
    })
    .catch((error) => {
      console.error("서버오류:", error);
    });
}

fixInfoButton.addEventListener("click", () => {
  fixInfo();
});
