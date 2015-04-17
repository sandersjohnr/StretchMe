"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("routines_stretches", {
      routine_id: {
        type: DataTypes.INTEGER
      },
      stretch_id: {
        type: DataTypes.INTEGER
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
    migration.dropTable("routines_stretches").done(done);
  }
};