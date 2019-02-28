'use strict';
module.exports = (sequelize, DataTypes) => {
  const Competitions = sequelize.define('Competitions', {
    competition_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty(value) {
          if (value == null || value == undefined || value == '') {
            throw new Error('Competition name cannot be empty')
          }
        }
      }
    },
    schedule: {
      type: DataTypes.DATE,
      validate: {
        notEmpty(value) {
          if (value == null || value == undefined || value == '') {
            throw new Error('Schedule cannot be empty')
          }
        }
      }
    }
  }, {});
  Competitions.associate = function (models) {
    // associations can be defined here
    Competitions.belongsToMany(models.Clubs, { through: models.ClubsCompetitions })
  };
  return Competitions;
};