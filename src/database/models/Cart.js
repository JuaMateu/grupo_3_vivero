module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let columns = {
        id: {
            type: dataTypes.INTEGER(11), 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL(10, 0),
            allowNull: false
        }
    };
    let configurations = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Cart = sequelize.define(alias, columns, configurations);

    Cart.associate = models => {

        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })

        Cart.belongstoMany(models.Product, {
            as: 'products',
            through: 'cart_to_product',
            foreignKey: 'cart_id',
            otherKey: 'product_id',
            timestamps: false
        })

    }

    return Cart
    
}