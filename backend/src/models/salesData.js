// models/salesData.js
module.exports = (sequelize, Sequelize) => {
    const SalesData = sequelize.define('SalesData', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        product_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        quantity_sold: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sale_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        sale_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        createdAt: { // Explicitly define createdAt column
            type: Sequelize.DATE,
            field: 'createdAt'
        },
        updateddAt: { // Explicitly define createdAt column
            type: Sequelize.DATE,
            field: 'updateddAt'
        },
    }, {
        timestamps: true, // Enable automatic timestamps
    });

    // Define associations
    SalesData.associate = (models) => {
        SalesData.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
        SalesData.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    };

    return SalesData;
};
