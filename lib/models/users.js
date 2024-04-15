module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    oauth_client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'oauth_clients',
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_oauth_clients_id_fk",
        using: "BTREE",
        fields: [
          { name: "oauth_client_id" },
        ]
      },
    ]
  });
};
