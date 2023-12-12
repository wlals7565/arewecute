require("dotenv").config();

const development = {
  username: process.env.instanceUserId,
  password: process.env.instanceUserPw,
  database: process.env.instanceUserDatabase,
  host: process.env.instanceUserHost,
  dialect: "mysql"
};

module.exports = { development };
