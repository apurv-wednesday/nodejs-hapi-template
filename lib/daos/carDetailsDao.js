import { models } from '@models';

/**
 * Finds car details associated with a given cab ID.
 * @async
 * @param {number} cabId - The ID of the cab to search for.
 * @returns {Promise<Object>} A Promise that resolves with the car details associated with the provided cab ID.
 * @throws {Error} If an error occurs while finding the car details by cab ID.
 */
// eslint-disable-next-line import/prefer-default-export
export const findCarDetailsByCabId = (cabId) =>
  models.cabs.findOne({
    where: { id: cabId },
    include: [
      {
        model: models.carDetails,
        as: 'carDetail',
        attributes: ['carName', 'licensePlateNumber', 'carBrand'],
      },
    ],
  });

// Todo: Pending DAOs
// findCarDetailsById(carDetailsId): Retrieve car details by its ID.
// updateCarDetails(carDetailsId, updatedData): Update car details based on its ID.
// createCarDetails(carDetailsData): Create a new car details record in the database.
