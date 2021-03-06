"use strict";
module.exports = function(sequelize, DataTypes) {
  var stretches = sequelize.define("stretches", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Stretch name cannot be empty'}
      }
    },
    intro: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // notEmpty: { msg: 'Stretch intro cannot be empty'}
      }
    },
    instruction: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Stretch instruction cannot be empty'}
      }
    },
    setup_time: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: 'Setup time must be an integer'},
        min: { args: [1], msg: 'Setup time must be at least 1'},
        max: { args: [60], msg: 'Setup time must be 60 or less'}
      }
    },
    rep_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'Rep time must be at least 1'},
        max: { args: [300], msg: 'Rep time must be 300 or less'},
        isInt: { msg: 'Rep time must be an integer'}
      }
    },
    rep_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'Reps must be at least 1'},
        max: { args: [20], msg: 'Reps must be 20 or less'},
        isInt: { msg: 'Reps must be an integer'}
      }
    },
    band: {
      type: DataTypes.BOOLEAN
    },
    roller: {
      type: DataTypes.BOOLEAN
    },
    both_sides: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    media_url: {
      type: DataTypes.STRING,
      validate: {
        // isUrl: { msg: 'Media_url must be a valid url'}
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        stretches.belongsToMany(models.routines, {
          foreignKey: 'stretch_id',
          through: 'routines_stretches'
        })
      }
    }
  });
  return stretches;
};