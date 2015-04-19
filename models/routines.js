"use strict";
module.exports = function(sequelize, DataTypes) {
  var routines = sequelize.define("routines", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Routine name cannot be empty'}
      }
    },
    description: { 
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
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