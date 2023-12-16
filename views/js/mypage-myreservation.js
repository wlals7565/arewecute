export const generateReservationCards = async (myReservations) => {
  const cardList = document.querySelector(".wrapAllPetSitter");
  cardList.innerHTML = myReservations
    .map(
      (reservation) => `
      <div class="container">
        <div class="d-flex flex-wrap justify-content-center py-3 border">
          <a href="/html/pet-sitter-by-id.html?petSitterId=${
            reservation.petSitterId
          }" class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
            <img class="bi m-2 mx-5" src="../contents/${reservation.petSitterAnimal}.png" width="150" alt="dog" />
              <div class="fs-4">
                <P class="h2"><strong>${reservation.petSitterName} </strong><strong class="h3">sitter</strong></P>
                <p class="mt-2">comment : <strong class="h5"><strong>${
                  reservation.petSitterComment
                }</strong></strong></p> 
              </div>
          </a>
        <div href="/html/pet-sitter-by-id.html?petSitterId=${
          reservation.petSitterId
        }" class="m-4 align-self-center me-auto text-decoration-none">
          <div class="fs-3">
            <P class="h4">Career<strong class="h3"><strong> ${reservation.petSitterCareer}</strong>  month</strong></P>
            <P class="h4">Animal<strong class="h3"><strong> ${reservation.petSitterAnimal}</strong></strong></P>
          </div>
        </div>
        <div href="/" class="m-4 align-self-center me-auto text-decoration-none">
          <div class="fs-3 text-center">
            <P class="h4"><strong>${reservation.reservedAt.substring(0, 10)}</strong></P>
            <P id="cancel" class="h4 text-dark"><strong>${reservation.status}</strong></P>
            <button type="button" class="btn btn-outline-dark">예약수정</button>
            <button type="button" class="btn btn-outline-danger">예약취소</button>
          </div>
        </div>
      </div>
      <div class="container my-2">
        <div class="row border">
          <div class="col-sm-7 mx-5 my-3 h5"><strong>Your Comment : </strong>${reservation.comment}</strong></div>
        </div>
      </div>
    </div>`
    )
    .join("");
};

async function fetchMyReviews() {
  const response = await fetch("http://localhost:3000/api/reservation");
  const responseData = await response.json();
  const cards = responseData.data;

  return cards;
}

const myReservations = await fetchMyReviews();
generateReservationCards(myReservations);
