module.exports = (sequelize, dataTypes) => {
  let alias = "Order";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    total: {
      type: dataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    payment_method_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let configurations = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Order = sequelize.define(alias, columns, configurations);

  Order.associate = (models) => {
    Order.belongsTo(models.OrderToProduct, {
      as: "orderToProduct",
      foreignKey: "order_id",
    });

    Order.belongsTo(models.PaymentMethod, {
      as: "paymentMethod",
      foreignKey: "payment_method_id",
    });

    Order.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
  };

  return Order;
};
