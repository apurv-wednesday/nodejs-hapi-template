module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('car_details', [
      {
        car_name: 'Toyota Corolla',
        license_plate_number: 'ABC123',
        car_brand: 'Toyota',
      },
      {
        car_name: 'Honda Civic',
        license_plate_number: 'XYZ456',
        car_brand: 'Honda',
      },
      {
        car_name: 'Ford Mustang',
        license_plate_number: 'DEF789',
        car_brand: 'Ford',
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('drivers', null, {});
  },
};
