module.exports = (sequelize, dataTypes) => {
    let alias = 'Discount';
    let columns = {
        id: {
            type: dataTypes.INTEGER(11), 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        percentage: {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };
    let configurations = {
        timestamps: false,
        deletedAt: false
    };

    const Discount = sequelize.define(alias, columns, configurations);

    Discount.associate = models => {
        
        Discount.hasMany(models.Product,{
            as: 'product',
            foreignKey: 'discount_id'
        })
    }

    return Discount
    
}