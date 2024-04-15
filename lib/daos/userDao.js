import { models } from '@models';

const attributes = [
  'id',
  'first_name',
  'last_name',
  'email',
  'oauth_client_id',
];

export const findOneUser = async (userId) => models.users.findOne({
  attributes,
  where: {
    id: userId,
  },
  underscoredAll: false,
});

export const findAllUser = async (page, limit) => {
  const where = {};
  const totalCount = await models.users.count({ where });
  const allUsers = await models.users.findAll({
    attributes,
    where,
    offset: (page - 1) * limit,
    limit,
  });
  return { allUsers, totalCount };
};

// Todo: Pending DAOs
// findUserByEmail(email): Retrieve user details by their email.
// createUser(userData): Create a new user record in the database.
// updateUser(userId, updatedData): Update user details based on their ID.