import { ReservationsService } from "../services/reservations.service.js";

export class ReservationsController {
  constructor() {
    this.reservationService = new ReservationsService();
  }

  createOne = async (req, res, next) => {
    try {
      if (!req.body.petSitterId || !req.body.comment || !req.body.animal || !req.body.date) {
        throw new Error("InvalidParamsError");
      }

      const { petSitterId, company, comment, animal, date } = req.body;
      const userId = res.locals.userId;

      //오늘보다 과거에 예약을 하면 안됨
      const reservedAt = new Date(date);
      const isPastThanToday = await this.reservationService.isPastThanToday({ reservedAt });

      if (isPastThanToday) {
        throw new Error("PastThanToday");
      }

      //해당 펫시터의 다른 예약과 날짜 겹치는지 확인
      const prereservation = await this.reservationService.isReserved({ petSitterId, reservedAt });

      if (prereservation) {
        throw new Error("Prereservation");
      }

      const data = await this.reservationService.createdOne({
        userId,
        petSitterId,
        company,
        comment,
        animal,
        reservedAt
      });

      return res.status(201).json({
        success: true,
        message: "예약에 성공했습니다.",
        data
      });
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      const userId = res.locals.userId;

      const data = await this.reservationService.readByIdWithUser({ id: reservationId });

      //userId랑 다르면 읽기 불가
      const ownerReservation = data.userId === userId;
      if (!ownerReservation) {
        throw new Error("ownerReservation");
      }

      //해당 펫시터의 다른 예약과 날짜 겹치는지 확인
      const prereservation = await this.reservationService.isReserved({ petSitterId, reservedAt });

      if (prereservation) {
        throw new Error("Prereservation");
      }

      return res.status(200).json({
        success: true,
        message: "예약 조회에 성공했습니다.",
        data
      });
    } catch (error) {
      next(error);
    }
  };

  readByUser = async (req, res, next) => {
    try {
      const userId = res.locals.userId;

      const data = await this.reservationService.readByUser({ userId });

      return res.status(200).json({
        success: true,
        message: "예약 조회에 성공했습니다.",
        data
      });
    } catch (error) {
      next(error);
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      if (!req.body.petSitterId || !req.body.company || !req.body.comment || !req.body.animal || !req.body.date) {
        throw new Error("InvalidParamsError");
      }

      const { petSitterId, company, comment, animal, date } = req.body;
      const userId = res.locals.userId;

      const data = await this.reservationService.readById({ id: reservationId });

      if (!data) {
        throw new Error("NoReservation");
      }

      //userId랑 다르면 수정 불가
      const ownerReservation = data.userId === userId;
      if (!ownerReservation) {
        throw new Error("ownerReservation");
      }

      // 시간이 지났거나 status 완료인 경우 예약 변경 불가
      const isCompleted = await this.reservationService.isCompleted({
        ReservedDate: data.reservedAt,
        Reservedstatus: data.status
      });

      if (isCompleted) {
        throw new Error("CompletedReservation");
      }

      //예약 날짜 변경 시
      const reservedAt = new Date(date);
      const beforeUpdatedReservedAt = data.reservedAt.toISOString().split("T")[0];

      if (beforeUpdatedReservedAt !== date) {
        //오늘보다 앞의 날짜에 예약하면 안됨
        const isPastThanToday = await this.reservationService.isPastThanToday({ reservedAt });

        if (isPastThanToday) {
          throw new Error("PastThanToday");
        }

        //해당 펫시터의 다른 예약과 날짜 겹치는지 확인
        const prereservation = await this.reservationService.isReserved({ petSitterId, reservedAt });

        if (prereservation) {
          throw new Error("Prereservation");
        }
      }

      //업데이트
      await this.reservationService.updateOne({
        id: reservationId,
        petSitterId,
        company,
        comment,
        animal,
        reservedAt
      });

      const updatedData = await this.reservationService.readById({ id: reservationId });

      return res.status(200).json({
        success: true,
        message: "예약 수정에 성공했습니다.",
        updatedData
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      const userId = res.locals.userId;

      const data = await this.reservationService.readById({ id: reservationId });

      if (!data) {
        throw new Error("NoReservation");
      }

      //userId랑 다르면 삭제 불가
      const ownerReservation = data.userId === userId;
      if (!ownerReservation) {
        throw new Error("ownerReservation");
      }

      // 시간이 지났거나 status가 완료인 경우 예약 삭제 불가 (완료한 것은 완료한 채로 넣어져있음)
      const isCompleted = await this.reservationService.isCompleted({
        ReservedDate: data.reservedAt,
        Reservedstatus: data.status
      });

      if (isCompleted) {
        throw new Error("CompletedReservation");
      }

      await this.reservationService.deleteOne({ id: reservationId });

      return res.status(200).json({
        success: true,
        message: "예약 삭제에 성공했습니다.",
        data
      });
    } catch (error) {
      next(error);
    }
  };
}
