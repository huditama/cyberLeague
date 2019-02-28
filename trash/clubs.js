'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clubs = sequelize.define('Clubs', {
    club_name: DataTypes.STRING,
    address: DataTypes.INTEGER
  }, {});
  Clubs.associate = function (models) {
    // associations can be defined here
    Clubs.hasMany(models.Players)
    Clubs.belongsToMany(models.Competitions, { through: models.ClubsCompetitions })
  };
  return Clubs;
};