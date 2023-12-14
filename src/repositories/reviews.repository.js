import db from "../../models/index.cjs";
const { reviews } = db;

//a().b() 
export default class ReviewsRepository {
  async postReview() {
    console.log("postReview in Repository");
  }

  async getReviewsByPetSitterId() {
    console.log("getReviewsByPetSitterId in Repository");
  }

  async deleteReview() {
    console.log("deleteReview in Repository");
  }

  async patchReview() {
    console.log("patchReview in Repository");
  }
}
