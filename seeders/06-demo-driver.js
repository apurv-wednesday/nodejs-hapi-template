module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('drivers', [
      {
        name: 'Demo Driver 1',
        license_number: 'ABC123',
        contact_number: '1234567890',
        ratings: 4.5,
        status: 'active',
      },
      {
        name: 'Demo Driver 2',
        license_number: 'DEF456',
        contact_number: '9876543210',
        ratings: 4.2,
        status: 'active',
      },

      {
        name: 'Demo Driver 3',
        license_number: 'GHI789',
        contact_number: '4567890123',
        ratings: 4.0,
        status: 'active',
      },
      {
        name: 'Demo Driver 4',
        license_number: 'JKL012',
        contact_number: '7890123456',
        ratings: 4.8,
        status: 'active',
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('drivers', null, {});
  },
};
