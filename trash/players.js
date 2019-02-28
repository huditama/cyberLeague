'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

//VALIDATION NOT NULL DI APUS DULU
module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
    first_name: {
      type: DataTypes.STRING,
      // validate: {
      //   notNull: {
      //     args: true,
      //     msg: 'Field cannot be empty'
      //   }
      // }
    },
    last_name: {
      type: DataTypes.STRING,
      // validate: {
      //   notNull: {
      //     args: true,
      //     msg: 'Field cannot be empty'
      //   }
      // }
    },
    gender: DataTypes.ENUM('Male', 'Female'),
    email: {
      type: DataTypes.STRING,
      validate: {
        // notNull: {
        //   args: true,
        //   msg: 'Field cannot be empty'
        // },
        isEmail: {
          args: true,
          msg: 'Wrong e-mail format.'
        },
        isUnique: function (value) {
          return Players.findOne({
            where: {
              email: value.toLowerCase(),
              id: {
                [Op.ne]: this.id
              }
            }
          })
            .then((data) => {
              if (data) {
                throw new Error('E-mail is already registered. Try another e-mail.')
              }
            })
        }
      }
    },
    ClubId: DataTypes.INTEGER,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 15],
          msg: 'Password must be between 8-15 characters'
        }
      }
    },
    role: DataTypes.ENUM('Athlete', 'Admin', 'Promotor'),
  }, {
      hooks: {
        beforeCreate: (Players) => {
          Players.first_name = Players.first_name[0].toUpperCase() + Players.first_name.slice(1).toLowerCase()
          Players.last_name = Players.last_name[0].toUpperCase() + Players.last_name.slice(1).toLowerCase()
          Players.email = Players.email.toLowerCase()
        },
        beforeUpdate: (Players) => {
          Players.first_name = Players.first_name[0].toUpperCase() + Players.first_name.slice(1).toLowerCase()
          Players.last_name = Players.last_name[0].toUpperCase() + Players.last_name.slice(1).toLowerCase()
          Players.email = Players.email.toLowerCase()
        }
      }
    });
  Players.associate = function (models) {
    // associations can be defined here
    Players.belongsTo(models.Clubs)
  };
  return Players;
};