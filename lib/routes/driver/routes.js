import { findAllDrivers, findOneDriver } from '@daos/driversDao';
import { badImplementation, notFound } from '@utils/responseInterceptors';
import { transformDbArrayResponseToRawResponse } from '@utils/transformerUtils';
import Joi from 'joi';
import { get } from 'lodash';

export default [
  {
    method: 'GET',
    path: '/{driverId}',
    options: {
      description: 'get one driver by id',
      notes: 'GET driver info API',
      tags: ['api', 'driver'],
      cors: true,
      validate: {
        params: Joi.object({
            driverId: Joi.string().required(),
          }),
      },
    },

    handler: async (request, h) => {
      // circuit breaker, rate-limiter can be used here
      const { driverId } = request.params;
        const driverInfo = await findOneDriver(driverId);
        if (driverId){
          return h.response(driverInfo).code(200);
        }
        return notFound(`No driver found with id: ${driverId}`);
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const { page, limit } = request.query;
      return findAllDrivers(page, limit)
        .then((driversData) => {
          if (get(driversData.allDrivers, 'length')) {
            const { totalCount } = driversData;
            const allDrivers = transformDbArrayResponseToRawResponse(
                driversData.allDrivers,
            ).map((driver) => driver);

            return h.response({
              results: allDrivers,
              totalCount,
            });
          }
          return notFound('No drivers found');
        })
        .catch((error) => badImplementation(error.message));
    },
    options: {
      description: 'get all drivers',
      notes: 'GET drivers API',
      tags: ['api', 'driver'],
      plugins: {
        pagination: {
          enabled: true,
        },
        query: {
          pagination: true,
        },
      },
    },
  }
];
