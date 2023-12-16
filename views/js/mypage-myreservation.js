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
            <button type="button" id="fixReservation:petSitterId:${reservation.petSitterId}:reservationId:${
        reservation.id
      }" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#fixReservationModal${
        reservation.id
      }">예약수정</button>
            <button type="button" id="deleteReservation:petSitterId:${reservation.petSitterId}:reservationId:${
        reservation.id
      }" class="btn btn-outline-danger" >예약취소</button>
          </div>
        </div>
      </div>
      <div class="container my-2">
        <div class="row border">
          <div class="col-sm-7 mx-5 my-3 h5"><strong>Your Comment : </strong>${reservation.comment}</strong></div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="fixReservationModal${
      reservation.id
    }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="auth-wrapper">
          <div class="text-center">
            <h3 class="mb-3 font-weight-normal"><strong>예약수정</strong></h3>
          </div>
          <div class="m-3">
            <label for="example" class="form-label">Reservation Date</label>
            <input type="date" class="form-control" value="${reservation.reservedAt.substring(0, 10)}" id="InputDate${
        reservation.id
      }" aria-describedby="nameHelp">
          </div>
          <div class="m-3">
            <label for="example" class="form-label">Your Pet</label>
            <input type="text" class="form-control" value="${reservation.animal}" id="InputAnimal${
        reservation.id
      }" aria-describedby="regionHelp">
          </div>
          <div class="m-3">
            <label for="example" class="form-label">Comment</label>
            <input type="text" class="form-control" value="${reservation.comment}" id="InputComment${
        reservation.id
      }" aria-describedby="regionHelp">
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <a href="#" class="btn btn-outline-dark m-3" role="button" data-bs-dismiss="modal">뒤로가기</a>
            </div>
            <div>
              <button type="submit" id="fixReservationButton:${
                reservation.id
              }" class="btn btn-outline-dark m-3">수정하기</button>
            </div>
          </div>
        </div>
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
