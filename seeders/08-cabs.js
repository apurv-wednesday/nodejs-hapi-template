module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cabs', [
      {
        driver_id: 7,
        car_details_id: 1,
        location: Sequelize.literal('POINT(40.7128, -74.0060)'),
        status: 'available',
      },
      {
        driver_id: 8,
        car_details_id: 2,
        location: Sequelize.literal('POINT(34.0522, -118.2437)'),
        status: 'not-available',
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cabs', null, {});
  },
};
