import * as ridesDao from '@daos/ridesDao';
import { models } from '@models';
import { mockData } from '@utils/mockData';

jest.mock('@models', () => ({
  models: {
    rides: {
      create: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
    },
  },
}));

describe('rides Dao', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRide', () => {
    it('should create a new ride record in the database', async () => {
      const rideData = mockData.MOCK_RIDES;
      models.rides.create.mockResolvedValue(rideData);

      const createdRide = await ridesDao.createRide(rideData);

      expect(models.rides.create).toHaveBeenCalledWith(rideData);
      expect(createdRide).toEqual(rideData);
    });
  });

  describe('getRideById', () => {
    it('should retrieve details of a ride by its ID', async () => {
      const rideId = 1;
      const rideData = {
        /* Provide ride data for testing */
      };

      models.rides.findByPk.mockResolvedValue(rideData);

      const ride = await ridesDao.getRideById(rideId);

      expect(models.rides.findByPk).toHaveBeenCalledWith(rideId);
      expect(ride).toEqual(rideData);
    });
  });

  describe('findRidesByUserId', () => {
    it('should retrieve all rides associated with a specific user ID', async () => {
      const userId = 1;
      const rides = [mockData.MOCK_RIDES];
      const findRidesSpy = jest.spyOn(models.rides, 'findAll');
      findRidesSpy.mockResolvedValue(rides);

      const result = await ridesDao.findRidesByUserId(userId);

      expect(findRidesSpy).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(rides);
    });
  });

  describe('findActiveRidesByUserId', () => {
    it('should retrieve all active rides associated with a specific user ID', async () => {
      const userId = 1;
      const activeRides = [mockData.MOCK_RIDES]; 
      const findActiveRidesSpy = jest.spyOn(models.rides, 'findAll');
      findActiveRidesSpy.mockResolvedValue(activeRides);

      const result = await ridesDao.findActiveRidesByUserId(userId);

      expect(findActiveRidesSpy).toHaveBeenCalledWith({
        where: {
          userId,
          status: 'ongoing',
        },
      });
      expect(result).toEqual(activeRides);
    });
  });

  describe('findCompletedRidesByUserId', () => {
    it('should retrieve all completed rides associated with a specific user ID', async () => {
      const userId = 1;
      const completedRides = [mockData.MOCK_RIDES]; 
      const findCompletedRidesSpy = jest.spyOn(models.rides, 'findAll');
      findCompletedRidesSpy.mockResolvedValue(completedRides);

      const result = await ridesDao.findCompletedRidesByUserId(userId);

      expect(findCompletedRidesSpy).toHaveBeenCalledWith({
        where: {
          userId,
          status: 'completed',
        },
      });
      expect(result).toEqual(completedRides);
    });
  });
});
