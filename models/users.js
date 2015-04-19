"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username cannot be empty'},
        isAlphanumeric: { msg: 'Username can only contain letters and numbers'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'You must enter a password'}
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        users.hasMany(models.routines, {
          foreignKey: 'user_id'
        })
      }
    }
  });
  return users;
};