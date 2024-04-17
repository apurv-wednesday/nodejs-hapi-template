import { resetAndMockDB } from '@utils/testUtils';

describe('ride routes test', () => {
  let server;
  beforeEach(async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.rides.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return null;
        }
      });
    });
  });
  it('should return the created ride', async () => {
    const payload = {
      userId: '1',
      cabId: '1',
      startPoint: {
        latitude: 1,
        longitude: 1,
      },
    };
    const res = await server.inject({
      method: 'POST',
      url: '/ride/start',
      payload,
    });
    expect(res.statusCode).toBe(200);
    expect(res.result.userId).toEqual('1');
    expect(res.result.cabId).toEqual('1');
  });
  it('should get one ride by id', async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.rides.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return {
            id: '1',
            userId: '1',
            cabId: '1',
            startPoint: { latitude: 1, longitude: 1 },
          };
        }
      });
    });
    const res = await server.inject({
      method: 'GET',
      url: '/ride/1',
    });
    expect(res.statusCode).toBe(200);
    expect(res.result.id).toEqual('1');
    expect(res.result.user_id).toEqual('1');
    expect(res.result.cab_id).toEqual('1');
    expect(res.result.start_point).toEqual({ latitude: 1, longitude: 1 });
  });
  it('should return 404', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/ride/2',
    });
    expect(res.statusCode).toBe(404);
  });
});
