import db from "../../models/index.cjs";
import { Sequelize } from "sequelize";
const { reservations, pet_sitters } = db;

export class ReservationsRepository {
  readById = async ({ id }) => {
    const reservation = await reservations.findByPk(id);

    return reservation;
  };

  readByIdWithUser = async ({ id }) => {
    const reservation = await reservations.findByPk(id, {
      include: [{ model: pet_sitters, as: "petSitter" }],
      required: true
    });

    return reservation;
  };

  readByUser = async ({ userId }) => {
    const data = await reservations.findAll({
      where: {
        userId
      },
      include: [{ model: pet_sitters, as: "petSitter" }],
      required: true
    });

    return data;
  };

  readPreReservation = async ({ petSitterId, reservedAt }) => {
    const prereservation = await reservations.findAll({
      where: {
        petSitterId,
        reservedAt
      }
    });

    return prereservation;
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
