import { ReservationsRepository } from "../repositories/reservations.repository.js";
import db from "../../models/index.cjs";
const { reservations } = db;

export class ReservationsService {
  constructor() {
    this.reservationsRepository = new ReservationsRepository();
  }

  readById = async ({ id }) => {
    const reservation = await reservations.findByPk(id);

    return reservation;
  };

  isReserved = async ({ petSitterId, reservedAt }) => {
    const prereservation = await reservations.findAll({
      where: {
        petSitterId,
        reservedAt
      }
    });

    return prereservation.length ? true : false;
  };

  createdOne = async ({ userId, petSitterId, company, comment, animal, reservedAt }) => {
    const data = await reservations.create({
      userId,
      petSitterId,
      company,
      comment,
      animal,
      reservedAt
    });

    return data;
  };

  updateOne = async ({ id, petSitterId, company, comment, animal, reservedAt }) => {
    await reservations.update(
      {
        petSitterId,
        company,
        animal,
        reservedAt,
        comment
      },
      { where: { id: id } }
    );
  };

  deleteOne = async ({ id }) => {
    await reservations.destroy({ where: { id: id } });
  };
}
