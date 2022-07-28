module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let columns = {
        id: {
            type: dataTypes.INTEGER(11), 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        mobile: {
            type: dataTypes.int(11),
            allowNull: true
        },
        date_of_birth: {
            type: dataTypes.DATE,
            allowNull: true
        },
        user_category_id: {
            type: dataTypes.int(11),
            allowNull: false,
            defaultValue: 3
        },
        address_id: {
            type: dataTypes.int(11),
            allowNull: true
        }
    };
    let configurations = {
        timestamps: false,
        deletedAt: false
    };

    const User = sequelize.define(alias, columns, configurations);

    User.associate = models => {

        User.hasMeny(models.Address, {
            as: 'address', //revisar singular o plural
            foreignKey: 'address_id'
        })
    }

    return User
    
}