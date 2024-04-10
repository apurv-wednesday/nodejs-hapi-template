import { resetAndMockDB } from '@utils/testUtils';
import { mockData } from '@utils/mockData';

describe('drivers daos', () => {
  const { MOCK_DRIVER: mockDriver } = mockData;
  const attributes = [
    'id',
    'name',
    'licenseNumber',
    'contactNumber',
    'ratings',
    'status',
  ];

  describe('findOneDriver', () => {
    it('should find a driver by ID', async () => {
      const { findOneDriver } = require('@daos/driversDao');
      const testDriver = await findOneDriver(1);
      expect(testDriver.id).toEqual(1);
      expect(testDriver.name).toEqual(mockDriver.name);
      expect(testDriver.licenseNumber).toEqual(mockDriver.licenseNumber);
      expect(testDriver.contactNumber).toEqual(mockDriver.contactNumber);
      expect(testDriver.ratings).toEqual(mockDriver.ratings);
      expect(testDriver.status).toEqual(mockDriver.status);
    });
    it('should call findOne with the correct parameters', async () => {
      let spy;
      await resetAndMockDB((db) => {
        spy = jest.spyOn(db.models.drivers, 'findOne');
      });
      const { findOneDriver } = require('@daos/driversDao');

      let driverId = 1;
      await findOneDriver(driverId);
      expect(spy).toHaveBeenCalledWith({
        attributes,
        underscoredAll: false,
        where: {
          id: driverId,
        },
      });

      jest.clearAllMocks();
      driverId = 2;
      await findOneDriver(driverId);
      expect(spy).toHaveBeenCalledWith({
        attributes,
        underscoredAll: false,
        where: {
          id: driverId,
        },
      });
    });
  });

  describe('findAllDrivers ', () => {
    let spy;
    const where = {};
    let page = 1;
    let limit = 10;
    let offset = (page - 1) * limit;

    it('should find all the users', async () => {
      const { findAllDrivers } = require('@daos/driversDao');
      const { allDrivers } = await findAllDrivers(1, 10);
      const firstDriver = allDrivers[0];
      expect(firstDriver.id).toEqual(1);
      expect(firstDriver.name).toEqual(mockDriver.name);
      expect(firstDriver.licenseNumber).toEqual(mockDriver.licenseNumber);
      expect(firstDriver.contactNumber).toEqual(mockDriver.contactNumber);
      expect(firstDriver.ratings).toEqual(mockDriver.ratings);
      expect(firstDriver.status).toEqual(mockDriver.status);
    });

    it('should call findAll with the correct parameters', async () => {
      await resetAndMockDB((db) => {
        spy = jest.spyOn(db.models.drivers, 'findAll');
      });
      const { findAllDrivers } = require('@daos/driversDao');

      await findAllDrivers(page, limit);
      expect(spy).toHaveBeenCalledWith({
        attributes,
        where,
        offset,
        limit,
      });
      jest.clearAllMocks();
      page = 2;
      limit = 10;
      offset = (page - 1) * limit;
      await findAllDrivers(page, limit);
      expect(spy).toHaveBeenCalledWith({
        attributes,
        where,
        offset,
        limit,
      });
    });
    it('should call count with an empty object', async () => {
      await resetAndMockDB((db) => {
        spy = jest.spyOn(db.models.drivers, 'count');
      });
      const { findAllDrivers } = require('@daos/driversDao');
      await findAllDrivers(page, limit);
      expect(spy).toHaveBeenCalledWith({ where });
    });
  });
});
