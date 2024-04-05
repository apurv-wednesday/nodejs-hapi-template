module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rides', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    cabId: {
      field: "cab_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cabs',
        key: 'id'
      }
    },
    startPoint: {
      field: "start_point",
      type: DataTypes.GEOMETRY,
      allowNull: false
    },
    endPoint: {
      field: "end_point",
      type: DataTypes.GEOMETRY,
      allowNull: false
    },
    timeStart: {
      field: "time_start",
      type: DataTypes.DATE,
      allowNull: false
    },
    timeEnd: {
      field: "time_end",
      type: DataTypes.DATE,
      allowNull: false
    },
    fare: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    rideTime: {
      field: "ride_time",
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rides',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_user",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_cab",
        using: "BTREE",
        fields: [
          { name: "cabId" },
        ]
      },
    ]
  });
};
