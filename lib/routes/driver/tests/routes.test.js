import { mockData } from '@utils/mockData';
import { resetAndMockDB } from '@utils/testUtils';

const { MOCK_DRIVER: drivers } = mockData;

describe('/driver route tests', () => {
  let server;
  beforeEach(async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.drivers.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return drivers;
        }
      });
    });
  });
  it('should return all the drivers', async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.drivers.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return drivers;
        }
      });
    });
    const res = await server.inject({
      method: 'GET',
      url: '/driver',
    });
    const expectedResult = {
      results: [
        {
          id: 1,
          name: 'Test Driver',
          license_number: 'ABC1234',
          contact_number: '123456789',
          ratings: 5,
          status: 'available',
        },
      ],
      total_count: 1,
    };
    const { result } = res;
    expect(res.statusCode).toBe(200); // this means route exists with above parametres
    expect(result.results.length).toBe(expectedResult.results.length);
    const driver = result.results[0];
    const expectedDriver = expectedResult.results[0];
    expect(driver.id).toBe(expectedDriver.id);
    expect(driver.name).toBe(expectedDriver.name);
    expect(driver.license_number).toBe(expectedDriver.license_number);
    expect(driver.contact_number).toBe(expectedDriver.contact_number);
    expect(driver.ratings).toBe(expectedDriver.ratings);
    expect(driver.status).toBe(expectedDriver.status);
    expect(result.total_count).toBe(expectedResult.total_count);
  });

  it('should return notFound if no drivers are found', async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.drivers.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return null;
        }
      });
      allDbs.models.drivers.findAll = () => null;
    });
    const resp = await server.inject({
      method: 'GET',
      url: '/driver',
    });

    expect(resp.statusCode).toBe(404);
  });
  it('should return badImplementation if findAllDrivers fails', async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.drivers.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return null;
        }
      });
      allDbs.models.drivers.findAll = () =>
        new Promise((resolve, reject) => {
          reject(new Error());
        });
    });

    const res = await server.inject({
      method: 'GET',
      url: '/driver',
    });

    expect(res.statusCode).toBe(500);
  });
});

describe("/driver/{driverId} routes tests",()=> {
  let server;
  beforeEach(async () => {
    server = await resetAndMockDB(async (allDbs) => {
      allDbs.models.drivers.$queryInterface.$useHandler((query) => {
        if (query === 'findById') {
          return drivers;
        }
      });
    });
  });
  it("should return 200",async () => {
    const resp = await server.inject({
      method: "GET",
      url: "/driver/1"
    });
    expect(resp.statusCode).toBe(200);
  });
  it("should return 404",async ()=> {
    const res = await server.inject({
      method:"GET",
      url: "/drivers/2"
    });
    expect(res.statusCode).toBe(404);
    expect(res.result.message).toEqual("Not Found")
  })
})