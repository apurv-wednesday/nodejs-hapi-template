import { resetAndMockDB } from '@utils/testUtils';

describe('cabs route tests', () => {
  let server;
  beforeEach(async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.cabs.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return null;
        }
      });
    });
  });
  it('should return 500 if no body is passed', async () => {
    const payload = {};
    const res = await server.inject({
      method: 'POST',
      url: '/cabs/fetch',
      payload,
    });
    // console.log(res)
    expect(res.statusCode).toBe(500);
    expect(res.statusMessage).toEqual('Internal Server Error');
  });
  it('should return 400 for invalid payload', async () => {
    const payload = {
      userid: 1,
      currentLocation: {
        latitude: 1,
        longitude: 2,
      },
    }; // payload missing the currentLocation
    const resp = await server.inject({
      method: 'POST',
      url: '/cabs/fetch',
      payload,
    });
    expect(resp.statusCode).toBe(400);
    expect(resp.statusMessage).toEqual('Bad Request');
  });
  it('should return 200', async () => {
    const payload = {
      userId: '1',
      currentLocation: {
        latitude: 1,
        longitude: 2,
      },
    };
    const res = await server.inject({
      method: 'POST',
      url: '/cabs/fetch',
      payload,
    });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.result)).toBe(true);
    expect(res.result.length).toBeGreaterThan(0);
    const firstCab = res.result[0];
    expect(firstCab.id).toEqual(1);
    expect(firstCab.driverId).toEqual(1);
    expect(firstCab.carDetailsId).toEqual(1);
    expect(firstCab.status).toEqual('available');
  });
});
