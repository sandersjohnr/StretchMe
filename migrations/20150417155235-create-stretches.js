"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("stretches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      intro: {
        allowNull: false,
        type: DataTypes.STRING
      },
      instruction: {
        allowNull: false,
        type: DataTypes.STRING
      },
      setup_time: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      rep_time: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      reps: {
        allowNull: false,
        type: DataTypes.INTEGER
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
        type: DataTypes.STRING
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("stretches").done(done);
  }
};