import db from "../../models/index.cjs";
const { pet_sitters, reviews } = db;
import { Op } from "sequelize";

export class PetSittersRepository {
  /** 전체 펫시터 조회 */
  findAllPetSitters = async () => {
    // ORM인 Sequelize에서 pet_sitters 모델의 findAll 메서드를 사용해 데이터를 요청
    const petSitters = await pet_sitters.findAll({
      include: [{ model: reviews, as: "reviews" }]
    });
    const averageRates = petSitters.map((sitter) => {
      if (sitter.reviews.length > 0) {
        const totalRate = sitter.reviews.reduce((acc, cur) => acc + cur.rate, 0) / sitter.reviews.length;
        const averageRate = Math.round(totalRate * 10) / 10;
        return { id: sitter.id, averageRate: averageRate };
      } else {
        return { id: sitter.id, averageRate: 0 };
      }
    });
    petSitters.forEach((sitter) => {
      const averageRate = averageRates.find((rate) => rate.id === sitter.id);
      sitter.averageRate = averageRate ? averageRate.averageRate : 0;
    });
    //????? 구조가 너무 이상한데
    //const averageRate = petSitters.reviews.reduce((acc, cur) => acc + cur.rate, 0) / result.length;
    //console.log(averageRate);
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
  findPetSitterBySearch = async (career, animal, next) => {
    // ORM인 Sequelize에서 pet_sitters 모델 중 로우쿼리로 데이터를 요청
    try {
      let petSitters;

      if (animal === "cat" || animal === "dog") {
        petSitters = await pet_sitters.findAll({
          where: {
            career: {
              [Op.gte]: career
            },
            animal
          },
          include: [{ model: reviews, as: "reviews" }]
        });
      } else if (animal === "All") {
        petSitters = await pet_sitters.findAll({
          where: {
            career: {
              [Op.gte]: career
            }
          },
          include: [{ model: reviews, as: "reviews" }]
        });
      } else {
        petSitters = await pet_sitters.findAll({
          where: {
            career: {
              [Op.gte]: career
            },
            animal: {
              [Op.notIn]: ["cat", "dog"]
            }
          },
          include: [{ model: reviews, as: "reviews" }]
        });
      }
      const averageRates = petSitters.map((sitter) => {
        if (sitter.reviews.length > 0) {
          const totalRate = sitter.reviews.reduce((acc, cur) => acc + cur.rate, 0) / sitter.reviews.length;
          const averageRate = Math.round(totalRate * 10) / 10;
          return { id: sitter.id, averageRate: averageRate };
        } else {
          return { id: sitter.id, averageRate: 0 };
        }
      });
      petSitters.forEach((sitter) => {
        const averageRate = averageRates.find((rate) => rate.id === sitter.id);
        sitter.averageRate = averageRate ? averageRate.averageRate : 0;
      });
      return petSitters;
    } catch (error) {
      next(error);
    }
  };
}
