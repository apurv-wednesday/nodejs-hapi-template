import { resetAndMockDB } from '@utils/testUtils';

describe('cabs daos', () => {
  const attributes = ['id', 'driverId', 'carDetailsId', 'location', 'status'];

  describe('findAvailableCabs', () => {
    let findAllSpy;

    beforeEach(async () => {
      await resetAndMockDB((db) => {
        findAllSpy = jest.spyOn(db.models.cabs, 'findAll');
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should find all available cabs', async () => {
      const { findAvailableCabs } = require('@daos/cabsDao');
      const { allCabs } = await findAvailableCabs(1, 10);

      expect(allCabs.length).toBeGreaterThan(0);
      expect(findAllSpy).toHaveBeenCalledTimes(1)
      expect(findAllSpy).toHaveBeenCalledWith({
        attributes,
        where: { status: 'available' },
        offset: 0,
        limit: 10,
      });
    });
  });

  describe('findAllNearestCabs', () => {
    let findAllSpy;
    beforeEach(async () => {
      await resetAndMockDB((db) => {
        findAllSpy = jest.spyOn(db.models.cabs, 'findAll');
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should find all nearest cabs', async () => {
      const { findAllNearestCabs } = require('@daos/cabsDao');
      const givenLocation = { longitude: 1, latitude: 2 };
      const radius = 1000;
      const allNearestCabs = await findAllNearestCabs(
        1,
        10,
        givenLocation,
        radius,
      );

      expect(allNearestCabs.length).toBeGreaterThan(0);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
