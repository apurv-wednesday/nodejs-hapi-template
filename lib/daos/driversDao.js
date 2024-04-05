import { models } from '@models';

const attributes = [
  'id',
  'name',
  'licenseNumber',
  'contactNumber',
  'ratings',
  'status',
];

export const findOneDriver = async (driverId) =>
  models.drivers.findOne({
    attributes,
    where: {
      id: driverId,
    },
    underscoredAll: false,
  });

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
