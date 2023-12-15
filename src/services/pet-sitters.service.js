import { PetSittersRepository } from "../repositories/pet-sitters.repository.js";

export class PetSittersService {
  petSittersRepository = new PetSittersRepository();

  findAllPetSitters = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const petSitters = await this.petSittersRepository.findAllPetSitters();
    if (!petSitters) throw new Error("NoPetSitter");

    // 평점평균을 표현해야함
    // 평점평균순으로 sort해야함
    // petSitters.sort((a, b) => {
    //   return b.createdAt - a.createdAt;
    // });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return petSitters.map((petSitters) => {
      return {
        id: petSitters.id,
        name: petSitters.name,
        career: petSitters.career,
        comment: petSitters.comment,
        animal: petSitters.animal,
        averageRate: petSitters.averageRate
      };
    });
  };

  findPetSitterById = async (petSitterId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const petSitter = await this.petSittersRepository.findPetSitterById(petSitterId);
    if (!petSitter) throw new Error("NoPetSitter");

    return {
      id: petSitter.id,
      name: petSitter.name,
      career: petSitter.career,
      comment: petSitter.comment,
      animal: petSitter.animal
    };
  };

  findPetSitterBySearch = async (career, animal) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const searchedPetSitter = await this.petSittersRepository.findPetSitterBySearch(career, animal);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      name: searchedPetSitter.name,
      career: searchedPetSitter.career,
      comment: searchedPetSitter.comment,
      animal: searchedPetSitter.animal
    };
  };
}
