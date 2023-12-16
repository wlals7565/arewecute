export const generateReviewsCards = async (myReviews) => {
  const cardList = document.querySelector(".wrapAllMyReviews");
  cardList.innerHTML = myReviews
    .map(
      (myReview) => `
      <div class="container">
      <div class="d-flex flex-wrap justify-content-center py-3 border">
        <a href="/html/pet-sitter-by-id.html?petSitterId=${
          myReview.petSitter.id
        }" class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
          <img class="bi m-2 mx-5" src="../contents/${myReview.petSitter.animal}.png" width="150" alt="dog" />
          <div class="fs-4">
            <P class="h2"><strong>${myReview.petSitter.name} </strong><strong class="h3">sitter</strong></P>
            <p class="mt-2">comment : <strong class="h5"><strong>${myReview.petSitter.comment}</strong></strong></p> 
          </div>
        </a>
        <div href="/html/pet-sitter-by-id.html?petSitterId=${
          myReview.petSitter.id
        }" class="m-4 align-self-center me-auto text-decoration-none">
          <div class="fs-3">
            <P class="h4">Career<strong class="h3"><strong> ${myReview.petSitter.career}</strong>  month</strong></P>
            <P class="h4">Animal<strong class="h3"><strong> ${myReview.petSitter.animal}</strong></strong></P>
          </div>
        </div>
        <div href="/" class="m-4 align-self-center me-auto text-decoration-none">
          <div class="fs-3 text-center">
            <P class="h4"><strong>${myReview.createdAt.substring(0, 10)}</strong></P>
            <button id="fixReview:petSitterId:${myReview.petSitter.id}:reviewId:${
        myReview.id
      }" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#fixReviewModal${
        myReview.id
      }">리뷰수정</button>
            <button id="deleteReview:petSitterId:${myReview.petSitter.id}:reviewId:${
        myReview.id
      }" type="button" class="btn btn-outline-danger">리뷰삭제</button>
          </div>
        </div>
      </div>
      <div class="container my-2">
        <div class="row border">
          <div class="col-sm-7 mx-5 my-3 h5"><strong>Your Review : </strong>${myReview.comment}</strong></div>
          <div class="col-sm m-3 h5"><strong>Rate : </strong>${myReview.rate}.0</strong></div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="fixReviewModal${
      myReview.id
    }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="auth-wrapper">
          <div class="text-center">
            <h3 class="mb-3 font-weight-normal"><strong>리뷰 수정하기</strong></h3>
          </div>
          <div class="m-3">
            <label for="exampleComment" class="form-label">Comment</label>
            <input type="text" class="form-control" value="${myReview.comment}" id="reviewComment${
        myReview.id
      }" aria-describedby="regionHelp">
          </div>
          <div class="m-3">
            <label for="exampleRate" class="form-label">Rate(1~5)</label>
            <input type="range" class="form-range" min="1" max="5" value="${myReview.rate}" id="reviewRate${
        myReview.id
      }"></input>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <button type="submit" class="btn btn-outline-dark m-3">뒤로가기</button>
            </div>
            <div>
              <button type="submit" id="fixInfoButton:${myReview.id}" class="btn btn-outline-dark m-3">리뷰수정</button>
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
  const response = await fetch("http://localhost:3000/api/reviews/");
  const cards = await response.json();

  return cards;
}

const myReviews = await fetchMyReviews();
generateReviewsCards(myReviews);
