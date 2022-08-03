module.exports = (sequelize, dataTypes) => {
    let alias = 'PaymentMethod';
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
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    };
    let configurations = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const PaymentMethod = sequelize.define(alias, columns, configurations);

    PaymentMethod.associate = models => {

        PaymentMethod.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'payment_method_id'
        })

    }

    return PaymentMethod
    
}