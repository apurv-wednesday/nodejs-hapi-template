module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cabs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    driverId: {
      field: "driver_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'drivers',
        key: 'id'
      }
    },
    carDetailsId: {
      field: "car_details_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'car_details',
        key: 'id'
      }
    },
    location: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('not-available','available'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cabs',
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
        name: "fk_driver",
        using: "BTREE",
        fields: [
          { name: "driverId" },
        ]
      },
      {
        name: "fk_car_details",
        using: "BTREE",
        fields: [
          { name: "carDetailsId" },
        ]
      },
    ]
  });
};
