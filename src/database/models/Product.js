module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let columns = {
        id: {
            type: dataTypes.INTEGER(11), 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        care_level: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false
        },
        category_id : {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        discount_id : {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        label: {
            type: dataTypes.STRING(45),
            allowNull: true
        }
    };
    let configurations = {
        timestamps: false,
        deletedAt: false
    };

    const Product = sequelize.define(alias, columns, configurations);

    Product.associate = models => {

        Product.belongsTo(models.OrderToProduct, {
            as: 'orderToProduct', //revisar singular o plural
            foreignKey: 'id'
        })

        Product.belongsTo(models.Category,{
            as: 'category',
            foreignKey: 'category_id'
        })

        Product.belongsTo(models.Discount,{
            as: 'discount',
            foreignKey: 'discount_id'
        })
    }

    return Product
    
}