import { models } from '@models';

/**
 * Attributes to be selected when finding a driver.
 * @type {string[]}
 */
const attributes = [
  'id',
  'name',
  'licenseNumber',
  'contactNumber',
  'ratings',
  'status',
];

/**
 * Finds a driver by their ID.
 * @async
 * @param {number} driverId - The ID of the driver to find.
 * @returns {Promise<Object|null>} A Promise that resolves with the found driver object, or null if not found.
 */
export const findOneDriver = async (driverId) =>
  models.drivers.findOne({
    attributes,
    where: {
      id: driverId,
    },
    underscoredAll: false,
  });

/**
 * Finds all drivers with pagination support.
 * @async
 * @param {number} page - The page number.
 * @param {number} limit - The maximum number of drivers per page.
 * @returns {Promise<{allDrivers: Object[], totalCount: number}>} A Promise that resolves with an object containing an array of drivers for the current page and the total count of drivers.
 */
export const findAllDrivers = async (page, limit) => {
  const where = {};
  const totalCount = await models.drivers.count({ where });
  const allDrivers = await models.drivers.findAll({
    attributes,
    where,
    offset: (page - 1) * limit,
    limit,
  });
  return { allDrivers, totalCount };
};

// Todo: Pending DAOs
// createDriver(driverData): Create a new driver record in the database.
// updateDriver(driverId, updatedData): Update driver details based on their ID.
// deleteDriver(driverId): Delete a driver record from the database.
// findDriversByCarBrand(carBrand): Retrieve drivers associated with a specific car brand.
// findDriversByLicensePlate(licensePlateNumber): Retrieve drivers associated with a specific license plate number.