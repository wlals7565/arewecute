"use strict";

const initModels = require('./init-models.cjs');
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.cjs")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config); //이게 연결
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); //이게 연결
}

module.exports = initModels(sequelize);


