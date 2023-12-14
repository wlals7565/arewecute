const cardList = document.querySelector(".wrapPetSitter");
// URL에서 쿼리 문자열을 가져옵니다
let queryString = window.location.search;
// URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
let searchParams = new URLSearchParams(queryString);
// detail_id 매개변수의 값을 가져옵니다
let petSitterId = parseInt(searchParams.get("petSitterId"));
console.log("check" + petSitterId);
const petSitterData = await fetchPetSitters(petSitterId);
console.log(petSitterData);

export const generatePetSitterCards = async (petSitter) => {
  // petSitters.sort((a, b) => b.vote_count - a.vote_count);
  cardList.innerHTML = petSitter
    .map(
      (petSitter) => `
      <div class="container my-4">
      <div class="d-flex flex-wrap justify-content-center py-3 border">
        <a href="/" class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
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
        <a href="/" class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
        <div href="/" class="m-2 align-self-center me-auto text-decoration-none">
          <div class="fs-3 text-center">
            <p class="h4 text-black"><strong>예약하기</strong></p>
          </div>
        </div>
        </a>
        </div>
      </div>
    </div>`
    )
    .join("");
};

async function fetchPetSitters(petSitterId) {
  const response = await fetch("http://localhost:3000/api/petSitter/id/" + `${petSitterId}`);
  const responseData = await response.json();
  const cards = responseData.data;

  return cards;
}

export const petSitter = await fetchPetSitters();

generatePetSitterCards(petSitter);
