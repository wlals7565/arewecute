import { PetSittersService } from "../services/pet-sitters.service.js";
export class PetSittersController {
  petSittersService = new PetSittersService();

  findAllPetSitters = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllProducts 로직을 실행합니다.
      const petSitters = await this.petSittersService.findAllPetSitters();
      return res.status(200).json({ data: petSitters });
    } catch (err) {
      next(err);
    }
  };

  findPetSitterById = async (req, res, next) => {
    try {
      const { petSitterId } = req.params;

      // 서비스 계층에 구현된 findProductById 로직을 실행합니다.
      const petSitter = await this.petSittersService.findPetSitterById(petSitterId);

      return res.status(200).json({ data: petSitter });
    } catch (err) {
      next(err);
    }
  };

  findPetSitterBySearch = async (req, res, next) => {
      const {career, animal} = req.body
      if(!career && !animal ){
        res.status(404).json({code: 400, message: "본문이 잘못되어 있습니다."});
        return;
      }
      // 서비스 계층에 구현된 updateUser 로직을 실행합니다.
      const searchedPetSitter = await this.petSittersService.findPetSitterBySearch(career, animal, next);
      return res.status(200).json({ searchedPetSitter });
  };
}
