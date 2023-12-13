import { ReservationsRepository } from "../repositories/reservations.repository.js";

export class ReservationsService {
  constructor() {
    this.reservationsRepository = new ReservationsRepository();
  }
  readOne = async ({ id }) => {};
}
