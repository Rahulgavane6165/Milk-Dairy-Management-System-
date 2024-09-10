// models/product.js
module.exports = (sequelize, Sequelize) => {
    const Collection = sequelize.define('Collection', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        milk_type: {
            type: Sequelize.ENUM('cow', 'buffalo', 'sheep', 'cattle', 'other'),
            allowNull: false
        },
        fat: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        tableName: 'collection', 
    });

    return Collection;
};
