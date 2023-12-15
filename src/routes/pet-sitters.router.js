import express from "express";
import { PetSittersController } from "../controllers/pet-sitters.controller.js";
const   router = express.Router();

const petSittersController = new PetSittersController();

/** 펫 시터 조회 API **/
router.get("/", petSittersController.findAllPetSitters);

router.get("/id/:petSitterId/", petSittersController.findPetSitterById);

router.get("/search", petSittersController.findPetSitterBySearch);

export default router;
