const loginDiv = document.getElementById("loginDiv");
const signupDiv = document.getElementById("signupDiv");
const myPageDiv = document.getElementById("myPageDiv");
const logoutDiv = document.getElementById("logoutDiv");

export const generatePetSitterCards = async (petSitters) => {
  const cardList = document.querySelector(".wrapAllPetSitter");
  // petSitters.sort((a, b) => b.rate - a.rate);
  cardList.innerHTML = petSitters
    .map(
      (petSitter) => `
      <div class="container my-4">
      <div class="d-flex flex-wrap justify-content-center py-3 border">
        <a href="/html/pet-sitter-by-id.html?petSitterId=${petSitter.id}" class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
          <img class="bi m-2 mx-5" src="../contents/${petSitter.animal}.png" width="150" alt="dog" />
          <div class="fs-4">
            <P class="h2"><strong>${petSitter.name} </strong><strong class="h3">sitter</strong></P>
            <p class="mt-2">comment : <strong class="h5"><strong>${petSitter.comment}</strong></strong></p> 
          </div>
        </a>
        <div href="/" class="m-2 align-self-center me-auto text-decoration-none">
          <P class="h4">Career<strong class="h3"><strong> ${petSitter.career}</strong>  month</strong></P>
          <P class="h4">Animal<strong class="h3"><strong> ${petSitter.animal}</strong></strong></P>
          <P class="h4">Grades<strong class="h3"><strong> 5.0</strong></strong></P>
        </div>
        <div class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
        <div class="m-2 align-self-center me-auto text-decoration-none" data-bs-toggle="modal" data-bs-target="#reservationModal">
          <div class="fs-3 text-center">
            <p class="h4 text-black"><strong>예약하기</strong></p>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>`
    )
    .join("");
};

async function fetchPetSitters() {
  const response = await fetch("http://localhost:3000/api/petSitter");
  const responseData = await response.json();
  const cards = responseData.data;

  return cards;
}

const petSitters = await fetchPetSitters();
generatePetSitterCards(petSitters);

let isLoggedIn = false;

if (document.cookie.includes("accessToken")) {
  isLoggedIn = true;
} else {
  isLoggedIn = false;
}

// 로그인 상태에 따라 로그인 버튼의 표시 여부를 업데이트하는 함수
function updateLoginButton() {
  if (isLoggedIn) {
    // 로그인 상태인 경우, 로그인 버튼을 숨깁니다.
    loginDiv.style.display = "none";
    signupDiv.style.display = "none";
    myPageDiv.style.display = "block";
    logoutDiv.style.display = "block";
  } else {
    // 로그인 상태가 아닌 경우, 로그인 버튼을 표시합니다.
    loginDiv.style.display = "block";
    signupDiv.style.display = "block";
    myPageDiv.style.display = "none";
    logoutDiv.style.display = "none";
  }
}

updateLoginButton(isLoggedIn); // 로그인 버튼의 표시 여부를 업데이트합니다.
