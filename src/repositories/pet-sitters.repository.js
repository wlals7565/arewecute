import db from "../../models/index.cjs";
const { pet_sitters } = db;

export class PetSittersRepository {
  /** 전체 펫시터 조회 */
  findAllPetSitters = async () => {
    // ORM인 Sequelize에서 pet_sitters 모델의 findAll 메서드를 사용해 데이터를 요청
    const petSitters = await pet_sitters.findAll();
    return petSitters;
  };

  /** 개별 시터조회 */
  findPetSitterById = async (petSitterId) => {
    // ORM인 Sequelize에서 pet_sitters 모델의 findOne 메서드를 사용해 데이터를 요청
    const petSitter = await pet_sitters.findOne({
      where: { id: petSitterId }
    });

    return petSitter;
  };

  /** 시터 검색조회 */
  findPetSitterBySearch = async (career, animal) => {
    // ORM인 Sequelize에서 pet_sitters 모델 중 로우쿼리로 데이터를 요청
    const petSitter = await pet_sitters.findOne({
      where: { career, animal }
    });

    return petSitter;
  };
}
