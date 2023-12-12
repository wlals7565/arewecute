var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _pet_sitters = require("./pet_sitters");
var _reservations = require("./reservations");
var _reviews = require("./reviews");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var pet_sitters = _pet_sitters(sequelize, DataTypes);
  var reservations = _reservations(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  reservations.belongsTo(pet_sitters, { as: "petSitter", foreignKey: "petSitterId"});
  pet_sitters.hasMany(reservations, { as: "reservations", foreignKey: "petSitterId"});
  reviews.belongsTo(pet_sitters, { as: "petSitter", foreignKey: "petSitterId"});
  pet_sitters.hasMany(reviews, { as: "reviews", foreignKey: "petSitterId"});
  reservations.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(reservations, { as: "reservations", foreignKey: "userId"});
  reviews.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "userId"});

  return {
    SequelizeMeta,
    pet_sitters,
    reservations,
    reviews,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
