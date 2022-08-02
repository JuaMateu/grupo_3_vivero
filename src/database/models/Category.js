module.exports = (sequelize, dataTypes) => {
  let alias = "Category";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
  };
  let configurations = {
    timestamps: false,
    deletedAt: false,
  };

  const Category = sequelize.define(alias, columns, configurations);

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id",
    });
  };

  return Category;
};
