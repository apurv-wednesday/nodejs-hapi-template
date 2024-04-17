import { createRide, getRideById } from '@daos/ridesDao';
import Joi from 'joi';

export default [
  {
    method: 'POST',
    path: '/start',
    options: {
      description: 'driver starts the ride',
      notes: 'driver starts the ride',
      tags: ['api', 'driver-start-ride'],
      cors: true,
      validate: {
        payload: Joi.object({
          userId: Joi.string(),
          cabId: Joi.string(),
          startPoint: Joi.object({
            latitude: Joi.number(),
            longitude: Joi.number(),
          }),
        }),
      },
    },

    handler: async (request, h) => {
      // circuit breaker, rate-limiter can be used here
      const { userId, cabId, startPoint } = request.payload;
      const rideData = {
        userId,
        cabId,
        startPoint,
        timeStart: new Date(),
      };
      const createdRide = await createRide(rideData);
      return h.response(createdRide).code(200);
    },
  },
  {
    method: 'GET',
    path: '/{rideId}',
    options: {
      description: 'get one ride by ID',
      notes: 'GET ride API',
      tags: ['api', 'rides'],
      cors: true,
      validate: {
        params: Joi.object({
          rideId: Joi.string().required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { rideId } = request.params;
      const rideInfo = await getRideById(rideId);
      if (rideInfo) {
        return h.response(rideInfo).code(200);
      }
      return h.response(`No data found for ride ${rideId}`).code(404);
    },
  },
];
