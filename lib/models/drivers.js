module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drivers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    licenseNumber: {
      field: "license_number",
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contactNumber: {
      field: "contact_number",
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ratings: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'drivers',
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
