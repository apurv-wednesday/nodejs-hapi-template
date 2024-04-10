module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    carName: {
      field: "car_name",
      type: DataTypes.STRING(50),
      allowNull: false
    },
    licensePlateNumber: {
      field: "license_plate_number",
      type: DataTypes.STRING(50),
      allowNull: false
    },
    carBrand: {
      field:"car_brand",
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'car_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
