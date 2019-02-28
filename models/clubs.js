'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clubs = sequelize.define('Clubs', {
    club_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty(value) {
          if (value == null || value == undefined || value == '') {
            throw new Error('Club name cannot be empty')
          }
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty(value) {
          if (value == null || value == undefined || value == '') {
            throw new Error('Address cannot be empty')
          }
        }
      }
    }
  }, {});
  Clubs.associate = function (models) {
    // associations can be defined here
    Clubs.hasMany(models.Players)
    Clubs.belongsToMany(models.Competitions, { through: models.ClubsCompetitions })
  };
  return Clubs;
};