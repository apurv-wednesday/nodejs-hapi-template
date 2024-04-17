

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('rides', 'end_point', {
        type: Sequelize.DataTypes.GEOMETRY('POINT'),
        allowNull: true,
      }),
      queryInterface.changeColumn('rides', 'ride_time', {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: true,
      }),
      queryInterface.changeColumn('rides', 'fare', {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: true,
      }),
      queryInterface.changeColumn('rides', 'time_end', {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('rides', 'end_point', {
        type: Sequelize.DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      }),
      queryInterface.changeColumn('rides', 'ride_time', {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }),
      queryInterface.changeColumn('rides', 'fare', {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }),
      queryInterface.changeColumn('rides', 'time_end', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
    ]);
  },
};
