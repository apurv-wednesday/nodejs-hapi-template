import { resetAndMockDB } from '@utils/testUtils';
import { mockData } from '@utils/mockData';

describe('carDetails Dao', () => {
  const { MOCK_CABS: mockCab, MOCK_CAR_DETAILS: mockCarDetail } = mockData;
  const attributes = ['carName', 'licensePlateNumber', 'carBrand'];

  describe('findCarDetailsByCabId', () => {
    it('should find car details by cab ID', async () => {
      const { findCarDetailsByCabId } = require('@daos/carDetailsDao');
      await resetAndMockDB((db) => {
        db.models.cabs.findOne = jest.fn().mockResolvedValue(mockCab);
      });
      const cabId = 1;
      const carDetail = await findCarDetailsByCabId(cabId);
      expect(carDetail).toBeDefined();
      expect(carDetail.carName).toEqual(mockCarDetail.carName);
      expect(carDetail.licensePlateNumber).toEqual(
        mockCarDetail.licensePlateNumber,
      );
      expect(carDetail.carBrand).toEqual(mockCarDetail.carBrand);
    });

    it('should call findOne with the correct parameters', async () => {
      let spy;
      await resetAndMockDB((db) => {
        spy = jest.spyOn(db.models.cabs, 'findOne');
      });

      const { findCarDetailsByCabId } = require('@daos/carDetailsDao');
      const cabId = 1;

      await findCarDetailsByCabId(cabId);

      expect(spy).toHaveBeenCalledWith({
        where: { id: cabId },
        include: [
          {
            model: expect.any(Object),
            as: 'carDetail',
            attributes,
          },
        ],
      });
    });
  });
});
