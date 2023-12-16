const searchPetSitterButton = document.querySelector("#searchPetSitterButton");

export const generateSearchedPetSitterCards = async (petSitters) => {
  const cardList = document.querySelector(".wrapAllPetSitter");
  petSitters.sort((a, b) => b.averageRate - a.averageRate);
  cardList.innerHTML = petSitters
    .map(
      (petSitter) => `
      <div class="container my-4" value="${petSitter.id}">
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
          <P class="h4">Grades<strong class="h3"><strong> ${petSitter.averageRate}</strong></strong></P>
        </div>
        <div class="d-flex align-items-center m-4 me-md-auto link-body-emphasis text-decoration-none">
        <div class="m-2 align-self-center me-auto text-decoration-none" data-bs-toggle="modal" data-bs-target="#reservationModal">
          <div class="fs-3 text-center">
            <p class="h4 text-black"><strong class="petSitterId:${petSitter.id}" data-bs-toggle="modal" data-bs-target="#reservationModal">예약하기</strong></p>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>`
    )
    .join("");

  const getAllPetSitters = `
    <div>
      <a href="/html/index-pet-sitter.html" class="btn btn-outline-dark m-3" role="button">모든시터보기</a>
    </div>`;
  const viewAllPetSitters = document.querySelector("#viewAllPetSitters");
  console.log(viewAllPetSitters);
  viewAllPetSitters.innerHTML = getAllPetSitters;
};

searchPetSitterButton.addEventListener("click", async () => {
  async function fetchSearchedPetSitters() {
    const animal = document.querySelector("#selectAnimal").value;
    const career = document.querySelector("#selectCareer").value;
    const response = await fetch(`http://localhost:3000/api/petSitter/search/?animal=${animal}&career=${career}`);
    const responseData = await response.json();
    const cards = responseData.data;
    return cards;
  }

  const petSitters = await fetchSearchedPetSitters();
  console.log(petSitters);
  generateSearchedPetSitterCards(petSitters);
});
