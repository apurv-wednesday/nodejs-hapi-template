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
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    },
    endPoint: {
      field: "end_point",
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    timeStart: {
      field: "time_start",
      type: DataTypes.DATE,
      allowNull: false
    },
    timeEnd: {
      field: "time_end",
      type: DataTypes.DATE,
      allowNull: true
    },
    fare: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    rideTime: {
      field: "ride_time",
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rides',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
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
