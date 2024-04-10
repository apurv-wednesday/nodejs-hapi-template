import { models } from '@models';
import { Op, literal } from 'sequelize';

const attributes = ['id', 'driverId', 'carDetailsId', 'location', 'status'];

/**
 * Finds available cabs based on pagination parameters.
 * @async
 * @param {number} page - The page number for paginated results.
 * @param {number} limit - The maximum number of cabs to return per page.
 * @returns {Promise<{ allCabs: Array<Object> }>} - A promise that resolves to an object containing an array of available cabs.
 */
export const findAvailableCabs = async (page, limit) => {
  const where = {
    status: 'available',
  };
  const allCabs = await models.cabs.findAll({
    attributes,
    where,
    offset: (page - 1) * limit,
    limit,
  });
  return { allCabs };
};
/**
 * Finds all nearest available cabs within a given search radius from a specified location.
 * @async
 * @param {number} page - The page number for paginated results.
 * @param {number} limit - The maximum number of cabs to return per page.
 * @param {Object} givenLocation - The given location coordinates.
 * @param {number} givenLocation.longitude - The longitude of the given location.
 * @param {number} givenLocation.latitude - The latitude of the given location.
 * @param {number} searchRadius - The search radius (in kilometers) to find cabs around the given location.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of nearest available cabs.
 */
export const findAllNearestCabs = async (
  page,
  limit,
  givenLocation,
  searchRadius,
) => {
  const { longitude, latitude } = givenLocation;

  const allNearestCabs = await models.cabs.findAll({
    attributes: ['id', 'status'],
    where: {
      status: 'available',
      [Op.and]: [
        literal(`
          (6371 * acos(
            cos(radians(${latitude})) * cos(radians(ST_Y(location))) * cos(radians(ST_X(location)) - radians(${longitude})) +
            sin(radians(${latitude})) * sin(radians(ST_Y(location)))
          )) <= ${searchRadius}
        `)
      ],
    },
    include: [
      {
        model: models.carDetails,
        attributes: ['carName', 'licensePlateNumber', 'carBrand'],
        as: 'carDetail',
      },
    ],
    offset: (page - 1) * limit,
    limit,
    raw: true,
  });
  return allNearestCabs
};


// Todo: Pending DAOs
// findCabById(cabId): Retrieve cab details by its ID.
// updateCabStatus(cabId, newStatus): Update the status of a cab with the specified ID.
// findCabsByDriverId(driverId): Retrieve cabs associated with a specific driver ID.
// findCabsByLocation(latitude, longitude, searchRadius): Retrieve cabs within a specified radius of a given location.
// createCab(cabData): Create a new cab record in the database.
// updateCabLocation(cabId, newLocation): Update the location of a cab with the specified ID.
// updateCabDetails(cabId, updatedData): Update cab details based on its ID.