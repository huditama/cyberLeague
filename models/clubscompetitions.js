'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubsCompetitions = sequelize.define('ClubsCompetitions', {
    ClubId: DataTypes.INTEGER,
    CompetitionId: {
      type: DataTypes.INTEGER,
      validate: {
        isRegistered(value) {
          return ClubsCompetitions.findOne({
            where: {
              ClubId: this.ClubId,
              CompetitionId: value
            }
          })
            .then(data => {
              if (data) {
                throw new Error('This club is already registered for this competition')
              }
            })
        }
      }
    }
  }, {});
  ClubsCompetitions.associate = function (models) {
    // associations can be defined here
  };
  return ClubsCompetitions;
};