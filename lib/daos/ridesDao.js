import { models } from '@models';

/**
 * Create a new ride record in the database.
 * @param {Object} rideData - The data for the new ride.
 * @returns {Promise<Object>} - A promise that resolves to the created ride record.
 */
export const createRide = async (rideData) => {
  const createdRide = await models.rides.create(rideData);
  return createdRide;
};

/**
 * Retrieve details of a ride by its ID.
 * @param {number} rideId - The ID of the ride to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the ride details, or null if not found.
 */
export const getRideById = async (rideId) => {
  const ride = await models.rides.findByPk(rideId);
  return ride;
};

/**
 * Retrieve all rides associated with a specific user ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of rides associated with the user.
 */
export const findRidesByUserId = async (userId) => {
  const rides = await models.rides.findAll({ where: { userId } });
  return rides;
};

/**
 * Retrieve all active rides associated with a specific user ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of active rides associated with the user.
 */
export const findActiveRidesByUserId = async (userId) => {
  const activeRides = await models.rides.findAll({
    where: {
      userId,
      status: 'ongoing',
    },
  });
  return activeRides;
};

/**
 * Retrieve all completed rides associated with a specific user ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of completed rides associated with the user.
 */
export const findCompletedRidesByUserId = async (userId) => {
  const completedRides = await models.rides.findAll({
    where: {
      userId,
      status: 'completed',
    },
  });
  return completedRides;
};
