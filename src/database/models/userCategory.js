module.exports = (sequelize, dataTypes) => {
  let alias = "userCategory";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
  };
  let configurations = {
    timestamps: false,
    deletedAt: false,
  };

  const UserCategory = sequelize.define(alias, columns, configurations);

  UserCategory.associate = (models) => {
    UserCategory.hasMany(models.User, {
      as: "user", //no se si ponerlo en plural o no
      foreignKey: "user_category_id",
    });
  };

  return User;
};
