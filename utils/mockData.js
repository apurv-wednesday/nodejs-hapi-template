import {
  GRANT_TYPE,
  SCOPE_TYPE,
  OAUTH_CLIENT_ID,
  DEFAULT_METADATA_OPTIONS,
} from './constants';

export const mockMetadata = (
  scope = SCOPE_TYPE.ADMIN,
  resourceType = OAUTH_CLIENT_ID,
) => ({
  oauth_client_scope: {
    get: () => ({
      id: 1,
      oauth_client_id: 1,
      scope,
    }),
  },
  oauth_client_resources: [
    {
      get: () => ({
        id: 1,
        oauth_client_id: 1,
        resource_type: resourceType,
        resource_id: 1,
      }),
    },
  ],
});

export const mockData = {
  MOCK_USER: {
    id: 1,
    firstName: 'Sharan',
    lastName: 'Salian',
    email: 'sharan@wednesday.is',
    oauth_client_id: 1,
  },
  MOCK_DRIVER: {
    id: 1,
    name: 'Test Driver',
    licenseNumber: 'ABC1234',
    contactNumber: '123456789',
    ratings: 5,
    status: 'available',
  },
  MOCK_CABS: {
    id: 1,
    driverId: 1,
    carDetailsId: 1,
    location: {
      type: 'Point',
      coordinates: [1, 2],
    },
    status: 'available',
  },
  MOCK_CAR_DETAILS: {
    id: 1,
    car_name: 'Toyota Corolla',
    license_plate_number: 'ABC123',
    car_brand: 'Toyota',
  },
  MOCK_RIDES: {
    id: 1,
    userId: 1,
    cabId: 1,
    startPoint: {
      type: 'Point',
      coordinates: [1, 1],
    },
    endPoint: {
      type: 'Point',
      coordinates: [1, 2],
    },
    timeStart: new Date('2024-04-01T10:00:00Z'),
    timeEnd: new Date('2024-04-01T11:00:00Z'),
    fare: 10,
    rideTime: 10.5,
  },
  MOCK_OAUTH_CLIENTS: (metadataOptions = DEFAULT_METADATA_OPTIONS) => ({
    id: 1,
    clientId: 'TEST_CLIENT_ID_1',
    clientSecret: 'TEST_CLIENT_SECRET',
    grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
    ...mockMetadata(metadataOptions.scope, metadataOptions.resourceType),
  }),
  MOCK_OAUTH_CLIENT_TWO: {
    id: 1,
    clientId: 'TEST_CLIENT_ID_1',
    clientSecret: 'TEST_CLIENT_SECRET',
    grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
    ...mockMetadata(SCOPE_TYPE.USER),
  },
  MOCK_OAUTH_CLIENT_SUPER_USER: {
    id: 1,
    clientId: 'TEST_CLIENT_ID_1',
    clientSecret: 'TEST_CLIENT_SECRET',
    grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
    ...mockMetadata(SCOPE_TYPE.SUPER_ADMIN),
  },
  MOCK_OAUTH_CLIENT_RESOURCES: [
    {
      id: 1,
      oauthClientId: 'TEST_CLIENT_ID_1',
      resourceType: 'OAUTH_CLIENT_ID',
      resourceId: 1,
    },
    {
      id: 1,
      oauthClientId: 'TEST_CLIENT_ID_1',
      resourceType: 'OAUTH_CLIENT_ID',
      resourceId: 1,
    },
  ],
  MOCK_OAUTH_CLIENT_SCOPES: {
    id: 1,
    oauthClientId: 'TEST_CLIENT_ID_1',
    scope: SCOPE_TYPE.SUPER_ADMIN,
  },
};

export const createMockTokenWithScope = (
  scope,
  resourceType = OAUTH_CLIENT_ID,
) => ({
  oauthClientId: 'TEST_CLIENT_ID_1',
  metadata: {
    scope: mockMetadata(scope).oauth_client_scope.get(),
    resources: [
      mockMetadata(scope, resourceType).oauth_client_resources[0].get(),
    ],
  },
});
