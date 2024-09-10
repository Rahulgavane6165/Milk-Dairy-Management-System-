// models/product.js
module.exports = (sequelize, Sequelize) => {
    const MilkPrice = sequelize.define('MilkPrice', {
        id: {
            type: Sequelize.CHAR(36),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        fat: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        milk_type: {
            type: Sequelize.ENUM('cow', 'buffalo', 'sheep', 'cattle', 'other'),
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        tableName: 'milkprice'
    });

    return MilkPrice;
};
