module.exports = (sequelize, dataTypes) => {
  let alias = "OrderToProduct";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    product_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let configurations = {
    timestamps: false,
    deletedAt: false,
  };

  const OrderToProduct = sequelize.define(alias, columns, configurations);

  OrderToProduct.associate = (models) => {
    OrderToProduct.hasMany(models.Order, {
      as: "orders", //revisar singular o plural
      foreignKey: "order_id",
    });

    OrderToProduct.hasMany(models.Product, {
      as: "products",
      foreignKey: "product_id",
    });
  };

  return OrderToProduct;
};
