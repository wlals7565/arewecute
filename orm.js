require("dotenv").config();

const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("are_we_cute", process.env.instanceUserId, process.env.instanceUserPw, {
  host: process.env.instanceUserHost,
  dialect: "mysql"
  //noAlias: true // as 별칭 미설정 여부
});
auto.run((err) => {
  if (err) throw err;
});
