import { ReservationsRepository } from "../repositories/reservations.repository.js";
import db from "../../models/index.cjs";
const { reservations } = db;

export class ReservationsService {
  constructor() {
    this.reservationsRepository = new ReservationsRepository();
  }

  readById = async ({ id }) => {
    const reservation = await this.reservationsRepository.readById({ id });

    return reservation;
  };

  readByIdWithUser = async ({ id }) => {
    const reservation = await this.reservationsRepository.readByIdWithUser({ id });

    return reservation;
  };

  readByUser = async ({ userId }) => {
    const data = await this.reservationsRepository.readByUser({ userId });

    return data;
  };

  isReserved = async ({ petSitterId, reservedAt }) => {
    const prereservation = await this.reservationsRepository.readPreReservation({ petSitterId, reservedAt });

    return prereservation.length ? true : false;
  };

  isPastThanToday = async ({ reservedAt }) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    return reservedAt <= today ? true : false;
  };

  isCompleted = async ({ ReservedDate, Reservedstatus }) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (ReservedDate <= today || Reservedstatus === "완료") {
      return true;
    }
    return false;
  };

  createdOne = async ({ userId, petSitterId, company, comment, animal, reservedAt }) => {
    const data = await this.reservationsRepository.createdOne({
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
    await this.reservationsRepository.updateOne({
      id,
      petSitterId,
      company,
      comment,
      animal,
      reservedAt
    });
  };

  deleteOne = async ({ id }) => {
    await this.reservationsRepository.deleteOne({ id });
  };
}
