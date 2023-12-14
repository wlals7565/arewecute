import { ReservationsService } from "../services/reservations.service.js";

export class ReservationsController {
  constructor() {
    this.reservationService = new ReservationsService();
  }
  createOne = async (req, res, next) => {
    try {
      if (!req.body.petSitterId || !req.body.company || !req.body.comment || !req.body.animal || !req.body.date) {
        return res.status(400).json({
          success: false,
          errorMessage: "데이터 형식이 올바르지 않습니다."
        });
      }

      const { petSitterId, company, comment, animal, date } = req.body;
      //const { userId } = res.locals.user;
      const userId = 1;

      //오늘보다 과거에 예약을 하면 안됨
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const reservedAt = new Date(date);

      if (reservedAt <= today) {
        return res.status(400).json({
          success: false,
          errorMessage: "오늘 이후의 날짜로 예약해주세요."
        });
      }

      //해당 펫시터의 다른 예약과 날짜 겹치는지 확인
      const prereservation = await this.reservationService.isReserved({ petSitterId, reservedAt });

      if (prereservation) {
        return res.status(400).json({
          success: false,
          errorMessage: "해당 펫시터는 그 날 예약이 불가능합니다."
        });
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
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요."
      });
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      //const { userId } = res.locals.user;
      const userId = 1;

      const data = await this.reservationService.readById({ id: reservationId });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "해당 예약을 찾을 수 없습니다."
        });
      }

      //userId랑 다르면 읽기 불가
      const ownerReservation = data.userId === userId;
      if (!ownerReservation) {
        return res.status(403).json({
          success: false,
          message: "예약 조회에 권한이 없습니다."
        });
      }

      return res.status(200).json({
        success: true,
        message: "예약 조회에 성공했습니다.",
        data
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요."
      });
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      if (!req.body.petSitterId || !req.body.company || !req.body.comment || !req.body.animal || !req.body.date) {
        return res.status(400).json({
          success: false,
          errorMessage: "데이터 형식이 올바르지 않습니다."
        });
      }

      const { petSitterId, company, comment, animal, date } = req.body;
      //const { userId } = res.locals.user;
      const userId = 1;

      const data = await this.reservationService.readById({ id: reservationId });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "해당 예약을 찾을 수 없습니다."
        });
      }

      //userId랑 다르면 수정 불가
      const ownerReservation = data.userId === userId;
      if (!ownerReservation) {
        return res.status(403).json({
          success: false,
          message: "예약 수정에 권한이 없습니다."
        });
      }

      // 시간이 지났거나 state가 완료인 경우 예약 변경 불가
      const today = new Date();
      const reservedAt = new Date(date);
      today.setUTCHours(0, 0, 0, 0);

      if (data.reservedAt <= today || data.state === "완료") {
        return res.status(400).json({
          success: false,
          errorMessage: "지난 예약은 수정이 불가능합니다."
        });
      }

      //예약 날짜 변경 시
      const beforeUpdatedReservedAt = data.reservedAt.toISOString().split("T")[0];

      if (beforeUpdatedReservedAt !== date) {
        //오늘보다 앞의 날짜에 예약하면 안됨
        if (reservedAt <= today) {
          return res.status(400).json({
            success: false,
            errorMessage: "오늘 이후의 날짜로 예약해주세요."
          });
        }

        //해당 펫시터의 다른 예약과 날짜 겹치는지 확인
        const prereservation = await this.reservationService.isReserved({ petSitterId, reservedAt });

        if (prereservation) {
          return res.status(400).json({
            success: false,
            errorMessage: "해당 펫시터는 그 날 예약이 불가능합니다."
          });
        }
      }

      //업데이트
      await this.reservationService.updateOne({
        id: reservationId,
        petSitterId,
        company,
        animal,
        reservedAt,
        comment
      });

      const updatedData = await this.reservationService.readById({ id: reservationId });

      return res.status(200).json({
        success: true,
        message: "예약 수정에 성공했습니다.",
        updatedData
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요."
      });
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      //const { userId } = res.locals.user;
      const userId = 1;

      const data = await this.reservationService.readById({ id: reservationId });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "해당 예약을 찾을 수 없습니다."
        });
      }

      //userId랑 다르면 삭제 불가
      const ownerReservation = data.userId === userId;
      if (!ownerReservation) {
        return res.status(403).json({
          success: false,
          message: "예약 삭제에 권한이 없습니다."
        });
      }

      // 시간이 지났거나 state가 완료인 경우 예약 삭제 불가 (완료한 것은 완료한 채로 넣어져있음)
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      if (data.reservedAt <= today || data.state === "완료") {
        return res.status(400).json({
          success: false,
          errorMessage: "지난 예약은 수정이 불가능합니다."
        });
      }

      await this.reservationService.deleteOne({ id: reservationId });

      return res.status(200).json({
        success: true,
        message: "예약 삭제에 성공했습니다.",
        data
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요."
      });
    }
  };
}
