export const generatePetSitterCards = async (petSitterData) => {
  cardList.innerHTML = petSitterData
    .map(
      (petSitter) => `
      <div class="container my-4">
      <div class="d-flex flex-wrap justify-content-center py-3 border">
        <div class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
          <img class="bi m-2 mx-5" src="../contents/${petSitter.animal}.png" width="150" alt="dog" />
          <div class="fs-4">
            <P class="h2"><strong>${petSitter.name} </strong><strong class="h3">sitter</strong></P>
            <p class="mt-2">comment : <strong class="h5"><strong>${petSitter.comment}</strong></strong></p> 
          </div>
        </div>
        <div class="m-2 align-self-center me-auto text-decoration-none">
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

export const generatePetSitterReviews = async (reviewsData) => {
  reviewList.innerHTML = reviewsData
    .map(
      (review) => `
      <div class="container my-2">
        <div class="row border">
          <div class="col-sm-7 mx-5 my-3 h5"><strong>${review.user.name} : </strong>${review.comment}</strong></div>
          <div class="col-sm m-3 h5"><strong>Rate : </strong>${review.rate}.0</strong></div>
        </div>
      </div>`
    )
    .join("");
};

const cardList = document.querySelector(".wrapPetSitter");
const reviewList = document.querySelector("#reviews");

// URL에서 쿼리 문자열을 가져옵니다
let queryString = window.location.search;
// URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
let searchParams = new URLSearchParams(queryString);
// detail_id 매개변수의 값을 가져옵니다
let petSitterId = parseInt(searchParams.get("petSitterId"));
const petSitterData = await fetchPetSitters(petSitterId);
const reviewsData = await fetchReviews(petSitterId);
async function fetchPetSitters(petSitterId) {
  const response = await fetch("http://localhost:3000/api/petSitter/id/" + `${petSitterId}`);
  const responseData = await response.json();
  const cards = [responseData.data];

  return cards;
}

async function fetchReviews(petSitterId) {
  const response = await fetch("http://localhost:3000/api/reviews/" + `${petSitterId}`);
  const responseData = await response.json();
  const cards = responseData.result;
  return cards;
}

export const petSitter = await fetchPetSitters(petSitterId);

generatePetSitterCards(petSitterData);
generatePetSitterReviews(reviewsData);

// HTML에 같이 놓고 display block > CSS를 바꾼다.
// body안에 z인덱스(오마이갓) z인덱스를 1을주는식으로
// js 함수를 구현하는데
// 이벤트리스너같은거로 클릭이 발생하면 Body안에 넣어준다(뿌려주는거랑 똑같이)
