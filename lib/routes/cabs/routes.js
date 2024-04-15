import { findAllNearestCabs } from '@daos/cabsDao';
import Joi from 'joi';

export default [
  {
    method: 'POST',
    path: '/fetch',
    options: {
      description: 'fetch nearest available cabs',
      notes: 'fetch nearest cabs',
      tags: ['api', 'fetch-cabs'],
      cors: true,
      auth: false, // for testing purposes kept as false
      validate: {
        payload: Joi.object({
          userId: Joi.string(),
          currentLocation: Joi.object({
            latitude: Joi.number(),
            longitude: Joi.number(),
          }),
        }),
      },
    },

    handler: async (request, h) => {
      // circuit breaker, rate-limiter can be used here
      const { currentLocation, userId } = request.payload;
      const nearestCabs = await findAllNearestCabs(1, 10, currentLocation, 10);
      return h.response(nearestCabs).code(200);
    },
  },
];
