import db from "../../models/index.cjs";
const { reviews, users } = db;

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
      return result;
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
}
