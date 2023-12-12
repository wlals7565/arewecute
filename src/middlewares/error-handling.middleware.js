export default function (err, req, res, next) {
  switch (err.message) {
    // 공통
    case "InvalidParamsError":
      return res.status(400).json({
        errorMessage: "입력 값을 확인해주세요"
      });

    default:
      console.log(err);
      return res.status(500).send({
        errorMessage: "서버터짐"
      });
  }
}
