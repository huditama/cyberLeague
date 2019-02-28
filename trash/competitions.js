'use strict';
module.exports = (sequelize, DataTypes) => {
  const Competitions = sequelize.define('Competitions', {
    competition_name: DataTypes.STRING,
    schedule: DataTypes.DATE
  }, {});
  Competitions.associate = function (models) {
    // associations can be defined here
    Competitions.belongsToMany(models.Clubs, { through: models.ClubsCompetitions })
  };
  return Competitions;
};