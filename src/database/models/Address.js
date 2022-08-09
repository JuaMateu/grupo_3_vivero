module.exports = (sequelize, dataTypes) => {
    let alias = 'Address';
    let columns = {
        id: {
            type: dataTypes.INTEGER(11), 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        street: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        number: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        city: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        state: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        postal_code: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        user_id_address: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    };
    let configurations = {
        timestamps: false,
        deletedAt: false,
        freezeTableName: true,
        tableName: 'address'
    };

    const Address = sequelize.define(alias, columns, configurations);

    Address.associate = models => {

        Address.belongsTo(models.User, {
            as: 'user', //revisar singular o plural
            foreignKey: 'user_id_address'
        })
    }

    return Address
    
}