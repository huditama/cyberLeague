'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubsCompetitions = sequelize.define('ClubsCompetitions', {
    ClubId: DataTypes.INTEGER,
    CompetitionId: DataTypes.INTEGER
  }, {});
  ClubsCompetitions.associate = function(models) {
    // associations can be defined here
  };
  return ClubsCompetitions;
};