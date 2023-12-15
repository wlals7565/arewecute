import db from "../../models/index.cjs";
const { reviews, users, pet_sitters } = db;

//a().b()
export default class ReviewsRepository {
  async postReview(userId, petSitterId, comment, rate, next) {
    try {
      const result = await reviews.create({
        userId,
        petSitterId,
        comment,
        rate
      });
      return result;
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByPetSitterId(petSitterId, next) {
    try {
      const result = await reviews.findAll({
        where: { petSitterId },
        include: [{ model: users, as: "user", attributes: ["name"] }],
      });
      const averageRate = result.reduce((acc, cur) => acc + cur.rate, 0) / result.length;
      return {result, averageRate};
    } catch (error) {
      console.error(error)
      next(error);
    }
  }

  async deleteReview(userId, reviewId, petSitterId, next) {
    try {
      const result = await reviews.destroy({ where: { id: reviewId, petSitterId, userId } });
      return result;
    } catch (error) {
      next(error);
    }
  }

  async patchReview(userId, petSitterId, reviewId, comment, rate, next) {
    try {
      const result = await reviews.update({ comment, rate }, { where: { id: reviewId, petSitterId, userId } });
      return result;
    } catch (error) {
      next(error);
    }
  }

  async getMyReviews(id, next){
    try {
      const result = await reviews.findAll({
        where: {userId: id},
        include: [{model: pet_sitters, as: "petSitter"}],
      });
      console.log(result);
      return result;
    } catch(error){
      next(error)
    }
  }
}
