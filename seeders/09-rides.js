module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rides', [
      {
        user_id: 1,
        cab_id: 5,
        start_point: Sequelize.literal('POINT(40.7128, -74.0060)'),
        end_point: Sequelize.literal('POINT(34.0522, -118.2437)'),
        time_start: new Date('2024-04-01T08:00:00Z'),
        time_end: new Date('2024-04-01T09:00:00Z'),
        fare: 20.001,
        ride_time: 1.0,
      },
      {
        user_id: 2,
        cab_id: 6,
        start_point: Sequelize.literal('POINT(34.0522, -118.2437)'),
        end_point: Sequelize.literal('POINT(40.7128, -74.0060)'),
        time_start: new Date('2024-04-01T10:00:00Z'),
        time_end: new Date('2024-04-01T11:00:00Z'),
        fare: 25.789,
        ride_time: 1.5,
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rides', null, {});
  },
};
