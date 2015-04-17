"use strict";
module.exports = function(sequelize, DataTypes) {
  var routines = sequelize.define("routines", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Routine name cannot be empty'},
        isAlphanumeric: { msg: 'Routine name can only contain letters and numbers'}
      }
    },
    interval: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Interval must be an integer'},
        min: { args: [1], msg: 'Interval must be at least 1'},
        max: { args: [60], msg: 'Interval must be 60 or less'}
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        routines.belongsTo(models.users, {
          foreignKey: 'user_id'
        });
        routines.belongsToMany(models.stretches, {
          foreignKey: 'routine_id',
          through: 'routines_stretches'
        });
      }
    }
  });
  return routines;
};