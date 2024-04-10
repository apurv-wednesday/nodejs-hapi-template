module.exports = function (sequelize, DataTypes) {
  const Cabs = sequelize.define(
    'cabs',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      driverId: {
        field: 'driver_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'drivers',
          key: 'id',
        },
      },
      carDetailsId: {
        field: 'car_details_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'car_details',
          key: 'id',
        },
      },
      location: {
        type: DataTypes.GEOMETRY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('not-available', 'available'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'cabs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_driver',
          using: 'BTREE',
          fields: [{ name: 'driverId' }],
        },
        {
          name: 'fk_car_details',
          using: 'BTREE',
          fields: [{ name: 'carDetailsId' }],
        },
      ],
    },
  );
  Cabs.associate = (models) => {
    Cabs.belongsTo(models.carDetails, {
      foreignKey: 'carDetailsId',
      as: 'carDetail',
    });
  };
  return Cabs;
};
